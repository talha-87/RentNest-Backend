import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";
  let errorDetails: any = undefined;

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation error";
    errorDetails = err.issues;
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired";
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errorDetails && { errorDetails }),
  });
};

export default globalErrorHandler;