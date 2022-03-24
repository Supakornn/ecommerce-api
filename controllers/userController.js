const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createTokenUser, attachCookies, checkPermissions } = require("../utils");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getOneUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { email, username } = req.body;
  if (!email || !username) {
    throw new CustomError("Plese provide email and username");
  }
  // const user = await User.findOneAndUpdate(
  //   { _id: req.user.userId },
  //   { email, username },
  //   { new: true, runValidators: true }
  // );
  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.username = username;
  await user.save();
  const tokenUser = createTokenUser(user);
  attachCookies({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please enter a password");
  }
  const user = await User.findOne({ _id: req.user.userId });
  const isCorrectPass = await user.comparePassword(oldPassword);
  if (!isCorrectPass) {
    throw new CustomError.UnauthenticatedError("Wrong Password");
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Password changed" });
};

module.exports = {
  getAllUsers,
  getOneUser,
  showCurrentUser,
  updateUser,
  updateUserPassword
};
