import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../business/jwt";

export function verifyJwtController(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const token = request.query.token || request.headers["x-token"];
  try {
    const response = verifyJwt(token);
    request["user"] = response.user;
    next();
  } catch (error) {
    return next(error);
  }
}
