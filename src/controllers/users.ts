import createError from "http-errors";
import HttpStatus from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { loginBusiness } from "../business/users";
import { User } from "../models/user";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await loginBusiness(req.body);
    return res.status(HttpStatus.OK).json(response);
  } catch (error) {
    if (error.message === "Unauthorized") {
      return next(createError(HttpStatus.UNAUTHORIZED, "Unauthorized"));
    }

    next(createError(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
}

export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const createdUser = await User.create({ ...req.body });
    return res
      .status(HttpStatus.CREATED)
      .json(createdUser);
  } catch (error) {
    if (error.message === "Unauthorized") {
      return next(createError(HttpStatus.UNAUTHORIZED, "Unauthorized"));
    }

    next(createError(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
}


export async function getAllUserController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const users: User[] = await User.findAll();
    return res
      .status(HttpStatus.OK)
      .json(users);
  } catch (error) {
    if (error.message === "Unauthorized") {
      return next(createError(HttpStatus.UNAUTHORIZED, "Unauthorized"));
    }

    next(createError(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
}

export async function getUserByIdController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { id } = req.params;
    const user: User = await User.findByPk(id);
    return res
      .status(HttpStatus.OK)
      .json(user);
  } catch (error) {
    if (error.message === "Unauthorized") {
      return next(createError(HttpStatus.UNAUTHORIZED, "Unauthorized"));
    }

    next(createError(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
}

export async function updateUserController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { id } = req.params;
    const user = await User.update({...req.body}, { where: {id}});
    return res
      .status(HttpStatus.OK)
      .json(user);
  } catch (error) {
    if (error.message === "Unauthorized") {
      return next(createError(HttpStatus.UNAUTHORIZED, "Unauthorized"));
    }

    next(createError(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
}

export async function deleteUserController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });
    return res
      .status(HttpStatus.NO_CONTENT)
      .end();
  } catch (error) {
    if (error.message === "Unauthorized") {
      return next(createError(HttpStatus.UNAUTHORIZED, "Unauthorized"));
    }

    next(createError(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
}