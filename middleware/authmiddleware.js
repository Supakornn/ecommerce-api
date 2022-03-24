const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
  try {
    const { username, userId, role } = isTokenValid({ token });
    req.user = { username, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new CustomError.UnauthorizedError("UnauthorizedError to access this route");
  }
  next();
};

module.exports = { authenticateUser, authorizePermissions };
