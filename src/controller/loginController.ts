import { NextFunction, Request, Response } from "express";

import { errorHandler } from "../middlware/errorHandler";

import * as userService from "../services/userService";

import * as tokenService from "../services/tokenService";

export const login = (
  req: Request,
  res: Response,
  nextFunction: NextFunction
) => {
  const { email, password } = req.body;

  userService
    .login(email, password)
    .then((data) => res.json(data))
    .catch((err) => errorHandler(err, req, res, nextFunction));
};

export const getAccessToken = (
  req: Request,
  res: Response,
  nextFunction: NextFunction
) => {
  console.log("getAccessToken");
  const { refreshToken } = req.body;

  console.log(refreshToken);

  tokenService
    .getAccessToken(refreshToken)
    .then((data) => res.json(data))
    .catch((err) => errorHandler(err, req, res, nextFunction));
};
