import { NextFunction, Request, Response } from "express";

import bcrypt from "bcrypt";

import { errorHandler } from "../middlware/errorHandler";

import * as userService from "../services/userService";
import { AuthorizedRequest } from "../domain/UserInterface";

export const getAllUsers = (
  req: AuthorizedRequest,
  res: Response,
  nextFunction: NextFunction
) => {
  userService
    .getAllUsers()
    .then((data) => res.json(data))
    .catch((err) => errorHandler(err, req, res, nextFunction));
};

export const createUser = (
  req: Request,
  res: Response,
  nextFunction: NextFunction
) => {
  const { name, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  userService
    .createUser({ name, email, password: hashPassword })
    .then((data) => res.json(data))
    .catch((err) => errorHandler(err, req, res, nextFunction));
};

export const getUserDetailsByUserId = (
  req: AuthorizedRequest,
  res: Response,
  nextFunction: NextFunction
) => {
  const { userId } = req.params;

  userService
    .getUserDetails(+userId)
    .then((data) => res.json(data))
    .catch((err) => errorHandler(err, req, res, nextFunction));
};
