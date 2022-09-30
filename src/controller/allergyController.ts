import { NextFunction, Response } from "express";

import { AuthorizedRequest } from "../domain/UserInterface";
import { errorHandler } from "../middlware/errorHandler";

import * as allergyService from "../services/allergyService";

export const getAllergy = (
  req: AuthorizedRequest,
  res: Response,
  nextFunction: NextFunction
) => {
  const { id } = req.params;

  console.log(id);

  allergyService
    .getAllergy(Number(id))
    .then((data) => res.json(data))
    .catch((err) => errorHandler(err, req, res, nextFunction));
};

export const createAllergy = (
  req: AuthorizedRequest,
  res: Response,
  nextFunction: NextFunction
) => {
  const { userId } = req.params;

  console.log(userId);

  allergyService
    .createAllergy(Number(userId), req.body)
    .then((data) => res.json(data))
    .catch((err) => errorHandler(err, req, res, nextFunction));
};
