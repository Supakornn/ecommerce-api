const CustomAPIError = require("./customerror");
const UnauthenticatedError = require("./unauth");
const NotFoundError = require("./notfound");
const BadRequestError = require("./badreq");
const UnauthorizedError = require("./unauthorize");
module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError
};
