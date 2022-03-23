const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/");
const { attachCookies } = require("../utils");

// register
const register = async (req, res) => {
  const { email, username, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ email, username, password, role });

  const tokenUser = {
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role
  };

  attachCookies({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
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
  const tokenUser = {
    userId: user._id,
    username: user.username,
    role: user.role
  };

  attachCookies({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
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
  logout
};
