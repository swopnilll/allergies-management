import bycrpt from "bcrypt";

import jwt from "jsonwebtoken";

import User from "../models/User";
import { Success } from "../domain/Success";
import { UserInterface, UserToInsert } from "../domain/UserInterface";
import { Token } from "../domain/TokenInterface";

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
    message: "Users fetched successfully",
  };
};

export const login = async (
  email: string,
  password: string
): Promise<Success<Token>> => {
  const user = await User.getUserByEmail(email);

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

  const accessToken = jwt.sign({email, password}, process.env.JWT_SECRET as string);

  return {
    data: { accessToken }, 
    message: "User logged in successfully"
  };
};
