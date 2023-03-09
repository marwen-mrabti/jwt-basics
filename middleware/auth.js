const jwt = require("jsonwebtoken");
const { CustomAPIError, UnauthorizedError } = require("../errors/custom-error");

exports.isAuth = (req, res, next) => {
  // check if user is authenticated
  // if user is authenticated, then set req.user to decoded token
  // if user is not authenticated, throw an error
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new CustomAPIError("Not authenticated", 401);
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;

    next();
  } catch (error) {
    throw new UnauthorizedError("Not authenticated");
  }
};
