import { Router } from "express";

import {  createUser, getAllUsers, getUserDetailsByUserId } from "../controller/userController";
import * as allergyController from "../controller/allergyController";



export const userRouter = Router();

userRouter.get('/', getAllUsers);

userRouter.post('/', createUser);

userRouter.get("/:userId", getUserDetailsByUserId);

userRouter.get("/:userId/allergies", allergyController.getAllergiesByUserId);