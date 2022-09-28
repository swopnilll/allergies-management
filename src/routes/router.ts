import { Router } from "express";

import { userRouter } from "./userRoutes";
import { loginRouter } from "./loginRouter";
import { authenticate } from "../middlware/authenticate";

export const router = Router();

router.get('/', (req, res) => res.send("api v1"));

router.use('/login', loginRouter);

router.use(authenticate)

router.use('/users', userRouter );