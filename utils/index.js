const { createToken, isTokenValid, attachCookies } = require("./jwt");
const createTokenUser = require("./createtokenuser");
const checkPermissions = require("./checkpermissions");
const sendVerificationEmail = require("./verification");
const sendResetPasswordEmail = require("./resetpass");

module.exports = {
  createToken,
  isTokenValid,
  attachCookies,
  createTokenUser,
  checkPermissions,
  sendVerificationEmail,
  sendResetPasswordEmail
};
