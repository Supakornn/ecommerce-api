const { request } = require("express");
const CustomError = require("../errors");

const checkPermissions = (requestUser, resourceUserid) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserid.toString()) return;
  throw new CustomError.UnauthorizedError("Not authorized to access this page");
};

module.exports = checkPermissions;
