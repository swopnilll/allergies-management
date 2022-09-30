import Router from "express";
import * as loginController from "../controller/loginController";

const tokenRouter = Router();

tokenRouter.post("/", loginController.getAccessToken);

export default tokenRouter;