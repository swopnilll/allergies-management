import { Router } from "express";
import {  createUser, getAllUsers } from "../controller/userController";
import * as allergyController from "../controller/allergyController";



export const userRouter = Router();

userRouter.get('/', getAllUsers);

userRouter.post('/', createUser);

userRouter.get("/:allergyId", allergyController.getAllergiesByUserId);