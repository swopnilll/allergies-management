import { NextFunction, Request, Response } from "express";

// import { errorHandler } from "../middlware/errorHandler";

import * as userService from "../services/userService";

export const login = (
  req: Request,
  res: Response,
  nextFunction: NextFunction
) => {
  const { email, password } = req.body;

  userService
    .login(email, password)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};
