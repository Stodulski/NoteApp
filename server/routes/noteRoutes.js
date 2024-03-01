import Router from "express";
const noteRoutes = Router();

import { authController } from "../controllers/auth.js";
import { noteController } from "../controllers/note.js";

noteRoutes.get(
    "/note/new",
    authController.verifyToken,
    noteController.renderNewNote
);

noteRoutes.get(
    "/note/edit/:id",
    authController.verifyToken,
    noteController.renderActualNote
);

noteRoutes.post(
    "/note/new",
    authController.verifyToken,
    noteController.newNote
);

noteRoutes.post(
    "/note/delete",
    authController.verifyToken,
    noteController.deleteNote
);

noteRoutes.post(
    "/note/edit/:id",
    authController.verifyToken,
    noteController.editNote
);

export default noteRoutes;
