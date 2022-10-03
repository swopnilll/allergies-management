import { Router } from "express";

import { userRouter } from "./userRoutes";
import { loginRouter } from "./loginRouter";
import { logoutRouter } from "./logoutRouter";
import { authenticate } from "../middlware/authenticate";

import tokenRouter from "./tokenRouter";
import { allergyRouter } from "./allergyRouter";

import { createUser } from "../controller/userController";

export const router = Router();

router.use("/login", loginRouter);
router.use("/refresh", tokenRouter);
router.post("/register", createUser);

router.use(authenticate);

router.use("/users", userRouter);

router.use("/allergies", allergyRouter);

router.use("/logout", logoutRouter);
