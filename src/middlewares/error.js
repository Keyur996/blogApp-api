"use strict";

const ErrorResponse = require("./../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
   let error = { ...err };
   if (error.name === "CastError") {
      const message = `Invalid ${err.path}: ${err.value}.`;
      error = new ErrorResponse(message, 400);
   }

   if (error.code === 11000) {
      const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
      const message = `Duplicate field value: ${value}. Please use another value!`;
      error = new ErrorResponse(message, 400);
   }

   if (error.name === "ValidationError") {
      const errors = Object.values(err.errors).map((el) => el.message);
      const message = `Invalid input data. ${errors.join(". ")}`;
      error = new ErrorResponse(message, 400);
   }

   res.status(error.statusCode || 500).json({
      success: false,
      message: err.message || "Something Went Wrong",
   });
};

module.exports = errorHandler;
