import { NextFunction, Request, Response } from "express";

import { HttpException } from "../errors/HttpException";

const HttpError = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response<void> => {
  if (error instanceof HttpException) {
    return response.status(error.code).json({ message: error.message });
  }

  return response.status(500).json({
    status: "Error",
    message: `Internal server error - ${error.message}`,
  });
};

export { HttpError };
