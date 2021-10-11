import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { HttpException } from "../errors/HttpException";

export const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new HttpException("Não foi encontrado nenhum token!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    verify(token, "a286f20fded6bd61ee197c23d6cccdec");

    next();
  } catch (e) {
    throw new HttpException("Token inválido!", 401);
  }
};
