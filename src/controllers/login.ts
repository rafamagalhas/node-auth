import createError from "http-errors";
import HttpStatus from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { loginBusiness } from "../business/login";

export function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = loginBusiness(req.body);
    return res.json(response);
  } catch (error) {
    if (error.message === "Unauthorized") {
      return next(createError(HttpStatus.UNAUTHORIZED, "Unauthorized"));
    }

    next(createError(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
}
