const CustomAPIError = require("./customerror");
const UnauthenticatedError = require("./unauth");
const NotFoundError = require("./notfound");
const BadRequestError = require("./badreq");

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError
};
