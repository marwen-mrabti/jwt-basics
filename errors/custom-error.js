class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends CustomAPIError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

class NotFoundError extends CustomAPIError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

class UnauthorizedError extends CustomAPIError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
};
