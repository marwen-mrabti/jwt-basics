const { CustomAPIError } = require("../errors/custom-error");

// custom error handler for custom errors
// if error is an instance of a custom error, return the status code and message
// otherwise return a 500 status code

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).send("Something went wrong try again later");
};

module.exports = errorHandlerMiddleware;
