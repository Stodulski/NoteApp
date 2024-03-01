import Router from "express";
const mainRoutes = Router();

import { authController } from "../controllers/auth.js";
import { noteController } from "../controllers/note.js";

mainRoutes.get("/", authController.verifyToken, noteController.renderNote);

mainRoutes.get("*", authController.verifyToken, (req, res) => {
    res.render('404');
});

export default mainRoutes;
