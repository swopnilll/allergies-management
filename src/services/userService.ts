import bycrpt from "bcrypt";

import jwt from "jsonwebtoken";

import User from "../models/User";
import { Success } from "../domain/Success";
import { UserInterface, UserToInsert } from "../domain/UserInterface";
import { Token } from "../domain/TokenInterface";
import { RefreshToken } from "../models/RefreshToken";

export const getAllUsers = async (): Promise<Success<UserInterface[]>> => {
  const users = await User.getAllUsers();

  return {
    data: users,
    message: "Users fetched successfully",
  };
};

export const createUser = async (
  userPayload: UserToInsert
): Promise<Success<UserInterface>> => {
  const user = await User.createUser(userPayload);
  console.log(user);

  return {
    data: user,
    message: "Successfull signed new user",
  };
};

export const login = async (
  email: string,
  password: string
): Promise<Success<Token>> => {
  const user = await User.getUserByEmail(email);

  console.log("user", user);

  if (!user) {
    return {
      message: "Invalid email or password",
    };
  }

  const isPasswordMatch = await bycrpt.compare(password, user.password);

  if (!isPasswordMatch) {
    return {
      message: "Password does not match",
    };
  }

  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "60s",
    }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_TOKEN_SECRET as string
  );

  console.log(refreshToken);

  await RefreshToken.createReferenceToken({
    token: refreshToken,
    user_id: user.id,
    expires_at: new Date(Date.now() + 900000),
  });

  return {
    data: { accessToken, refreshToken },
    message: "User logged in successfully",
  };
};

export const logOut = async (userId: number): Promise<Success<any>> => {
  await RefreshToken.deleteReferenceToken(userId);

  return {
    message: "Successfully logout",
  };
};
