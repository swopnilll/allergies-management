import { NextFunction, Response } from "express";
import { AuthorizedRequest } from "../domain/UserInterface";

import { errorHandler } from "../middlware/errorHandler";

import * as userService from "../services/userService";

export const logout = (
  req: AuthorizedRequest,
  res: Response,
  nextFunction: NextFunction
) => {

    const userId = Number(req.authUser);

  userService
    .logOut(userId)
    .then((data) => res.json(data))
    .catch((err) => errorHandler(err, req, res, nextFunction));
};
