import { NextFunction, Response } from "express";

import { AuthorizedRequest } from "../domain/UserInterface";
import { errorHandler } from "../middlware/errorHandler";

import * as allergyService from "../services/allergyService";

export const getAllergiesByUserId = (
  req: AuthorizedRequest,
  res: Response,
  nextFunction: NextFunction
) => {
  const { userId } = req.params;

  allergyService
    .getAllergiesByUserId(Number(userId))
    .then((data) => res.json(data))
    .catch((err) => errorHandler(err, req, res, nextFunction));
};

export const createAllergy = (
  req: AuthorizedRequest,
  res: Response,
  nextFunction: NextFunction
) => {
  allergyService
    .createAllergy(req.body)
    .then((data) => res.json(data))
    .catch((err) => errorHandler(err, req, res, nextFunction));
};

export const updateAllergy = (
  req: AuthorizedRequest,
  res: Response,
  nextFunction: NextFunction
) => {

  const {allergyId} = req.params;

  allergyService
    .updateAllergy(+allergyId, req.body)
    .then((data) => res.json(data))
    .catch((err) => errorHandler(err, req, res, nextFunction));
};

export const deleteAllergy = (
  req: AuthorizedRequest,
  res: Response,
  nextFunction: NextFunction
) => {

  const {allergyId} = req.params;

  allergyService
    .deleteAllergy(+allergyId)
    .then((data) => res.json(data))
    .catch((err) => errorHandler(err, req, res, nextFunction));
};