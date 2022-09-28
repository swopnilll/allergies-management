import { Router } from "express";
import {  createUser, getAllUsers } from "../controller/userController";



export const userRouter = Router();

userRouter.get('/', getAllUsers);

userRouter.post('/', createUser);