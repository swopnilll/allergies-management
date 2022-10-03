import { Router } from "express";
import * as allergyController from "../controller/allergyController";

export const allergyRouter = Router();

allergyRouter.post("/", allergyController.createAllergy);

allergyRouter.patch("/:allergyId", allergyController.updateAllergy );

allergyRouter.delete("/:allergyId", allergyController.deleteAllergy);
