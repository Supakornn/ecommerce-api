const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/");
const { attachCookies, createTokenUser } = require("../utils");
const crypto = require("crypto");

// register
const register = async (req, res) => {
  const { email, username, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({ email, username, password, role, verificationToken });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Success Please check your email for verify", verificationToken });
};

// verifyEmail
const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw new CustomError.UnauthenticatedError("Verification Failed");
  }
  if (user.verificationToken !== verificationToken) {
    throw new CustomError.UnauthenticatedError("Verification Failed");
  }
  user.isVerifiled = true;
  user.verifiled = Date.now();
  user.verificationToken = "";
  await user.save();
  console.log(user);
  res.status(StatusCodes.OK).json({ msg: "Email Verified" });
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Plese provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Email is not available");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Password is not correct");
  }
  if (!user.isVerifiled) {
    throw new CustomError.UnauthenticatedError("Email is not verified");
  }
  const tokenUser = createTokenUser(user);
  attachCookies({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

// logout
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000)
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail
};
