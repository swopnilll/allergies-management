import bycrpt from "bcrypt";

import jwt from "jsonwebtoken";

import User from "../models/User";
import { Success } from "../domain/Success";
import { UserInterface, UserToInsert } from "../domain/UserInterface";
import { Token } from "../domain/TokenInterface";
import { RefreshToken } from "../models/RefreshToken";

import CustomError from "../misc/CustomError";
import {
  generateAccessToken,
  generateRefreshToken,
  addRefreshToken,
} from "./tokenService";

export const getAllUsers = async (): Promise<Success<UserInterface[]>> => {
  const users = await User.getAllUsers();

  return {
    data: users,
    message: "Users fetched successfully",
  };
};

export const getUserDetails = async (
  userId: number
): Promise<Success<UserInterface>> => {
  const user = await User.getUserById(userId);

  return {
    data: user,
    message: "User details fetched successfully",
  };
};

export const createUser = async (
  userPayload: UserToInsert
): Promise<Success<Token>> => {
  const user = await User.createUser(userPayload);

  const accessToken = generateAccessToken(user[0].id);

  const refreshToken = generateRefreshToken(user[0].id);

  await addRefreshToken(user[0].id, refreshToken);

  return {
    data: {
      accessToken,
      refreshToken,
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
    },
    message: "Successfull signed new user",
  };
};

export const login = async (
  email: string,
  password: string
): Promise<Success<Token>> => {
  const user = await User.getUserByEmail(email);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  const isPasswordMatch = await bycrpt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new CustomError(
      "Password does not match for the email provided",
      401
    );
  }

  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "600s",
    }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_TOKEN_SECRET as string
  );

  await RefreshToken.createReferenceToken({
    token: refreshToken,
    user_id: user.id,
    expires_at: new Date(Date.now() + 120),
  });

  return {
    data: {
      accessToken,
      refreshToken,
      id: user.id,
      name: user.name,
      email: user.email,
    },
    message: "User logged in successfully",
  };
};

export const logOut = async (userId: number): Promise<Success<any>> => {
  await RefreshToken.deleteReferenceToken(userId);

  return {
    message: "Successfully logout",
  };
};
