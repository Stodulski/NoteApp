import Router from "express";
const authRouter = Router();

import { authController } from "../controllers/auth.js";

authRouter.post("/signup", authController.signup);

authRouter.post("/signin", authController.signin);

authRouter.get("/logout", authController.logout);

export default authRouter;
