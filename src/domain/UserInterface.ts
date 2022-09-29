import { Request } from "express";

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type UserToInsert = Omit<UserInterface, "id">;

export interface AuthorizedRequest extends Request {
  authUser?: number;
}

export interface TokenPayload {
  userId: number;
}
