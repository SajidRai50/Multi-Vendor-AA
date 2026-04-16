const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Default error
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";

  // Invalid MongoDB ID
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    error = new ErrorHandler(message, 400);
  }

  // Duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate value for ${field}`;
    error = new ErrorHandler(message, 400);
  }

  // Invalid JWT
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid token. Please try again`;
    error = new ErrorHandler(message, 401);
  }

  // Expired JWT
  if (err.name === "TokenExpiredError") {
    const message = `Token expired. Please login again`;
    error = new ErrorHandler(message, 401);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};