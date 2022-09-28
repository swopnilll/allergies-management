import { Response, NextFunction } from "express";

import HTTP_CODE from "http-status-codes";

import jwt from "jsonwebtoken";
import CustomError from "../misc/CustomError";

import { AuthorizedRequest, TokenPayload } from "../domain/UserInterface";

export const authenticate = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("authenticate");
  console.log(req.headers);

  const accessToken = req.headers.authorization?.split(" ")[1];
  console.log(accessToken);

  try {
    const result = (await jwt.verify(
      accessToken as string,
      process.env.JWT_SECRET as string
    )) as TokenPayload;

    console.log(result);

    req.authUser = result.iat;
  } catch (err) {
    next(new CustomError(`Authentication failed`, HTTP_CODE.UNAUTHORIZED));
  }

  next();
};
