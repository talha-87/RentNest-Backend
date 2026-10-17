import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";

const auth = (...requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
     const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith("Bearer ")) {
  throw new AppError(401, "You are not authorized");
}

const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(
        token,
        config.jwt.accessTokenSecret
      ) as JwtPayload;

      if (
        requiredRoles.length &&
        !requiredRoles.includes(decoded.role)
      ) {
        throw new AppError(403, "Forbidden");
      }

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
