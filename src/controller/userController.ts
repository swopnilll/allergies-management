import { NextFunction, Request, Response } from "express";

import { errorHandler } from "../middlware/errorHandler";

import * as userService from "../services/userService";


export const getAllUsers = (req: Request, res: Response, nextFunction: NextFunction) => {
    userService
    .getAllUsers()
    .then(data => res.json(data))
    .catch(err => errorHandler(err, req, res, nextFunction))
  };