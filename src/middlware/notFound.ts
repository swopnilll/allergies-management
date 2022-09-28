import { NextFunction, Request, Response } from "express";
import CustomError from "../misc/CustomError";

/**
 * Middleware to handle invalid routes
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  console.log("not found");
  const error = new CustomError(`Not Found - ${req.originalUrl}`, 404);
  res.status(404);
  next(error);
};
