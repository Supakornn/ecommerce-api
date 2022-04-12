const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const createToken = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookies = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createToken({ payload: { user } });
  const refreshTokenJWT = createToken({ payload: { user, refreshToken } });
  const sevenDay = 1000 * 60 * 60 * 24 * 7;
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expiresIn: new Date(Date.now() + oneDay)
  });

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expiresIn: new Date(Date.now() + sevenDay)
  });
};

// const attachOneCookies = ({ res, user }) => {
//   const token = createToken({ payload: user });
//   const sevenDay = 1000 * 60 * 60 * 24 * 7;
//   res.cookie("token", token, {
//     httpOnly: true,
//     expiresIn: new Date(Date.now() + sevenDay),
//     secure: process.env.NODE_ENV === "production",
//     signed: true
//   });
// };

module.exports = { createToken, isTokenValid, attachCookies };
