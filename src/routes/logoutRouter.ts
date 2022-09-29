import { Router } from "express";

import * as logoutController from '../controller/logoutController';

export const logoutRouter = Router();

logoutRouter.delete("/",  logoutController.logout);