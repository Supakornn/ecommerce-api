const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const createToken = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookies = ({ res, user }) => {
  const token = createToken({ payload: user });
  const sevenDay = 1000 * 60 * 60 * 24 * 7;
  res.cookie("token", token, {
    httpOnly: true,
    expiresIn: new Date(Date.now() + sevenDay),
    secure: process.env.NODE_ENV === "production",
    signed: true
  });
};

module.exports = { createToken, isTokenValid, attachCookies };
