import { Router } from "express";
import * as allergyController from "../controller/allergyController";

export const allergyRouter = Router();

allergyRouter.get("/:id", allergyController.getAllergy);

allergyRouter.post("/:userId", allergyController.createAllergy);
