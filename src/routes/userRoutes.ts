import { Router } from "express";
import {  getAllUsers } from "../controller/userController";



export const userRouter = Router();

userRouter.get('/', getAllUsers);
