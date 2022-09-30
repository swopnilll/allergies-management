import { Router } from "express";

import { userRouter } from "./userRoutes";
import { loginRouter } from "./loginRouter";
import { logoutRouter } from "./logoutRouter";
import { authenticate } from "../middlware/authenticate";

import tokenRouter from "./tokenRouter";
import { allergyRouter } from "./allergyRouter";

export const router = Router();

router.get("/", (req, res) => res.send("Please login"));

router.use("/login", loginRouter);

router.use("/token", tokenRouter);

router.use(authenticate);

router.use("/users", userRouter);

router.use("/allergies", allergyRouter);

router.use("/logout", logoutRouter);
