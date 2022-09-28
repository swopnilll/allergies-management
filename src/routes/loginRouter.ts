import { Router } from "express";

import * as loginController from '../controller/loginController';

export const loginRouter = Router();

loginRouter.post("/",  loginController.login);

