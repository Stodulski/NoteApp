import { authController } from "./auth.js";
import { noteModel } from "../model/note.js";

export class noteController {
    static async renderNote(req, res) {
        const userData = await authController.getUserData(req, res);
        const notes = await noteModel.searchNote(userData.id);
        res.render("home", {
            notes,
        });
    }

    static async newNote(req, res) {
        const { title, desc } = req.body;
        if (title.length < 1 || desc.length < 1)
            return res.json({ error: "Complete all inputs" });
        const userData = await authController.getUserData(req, res);
        const savedNote = await noteModel.newNote(title, desc, userData.id);
        res.json({ savedNote });
    }

    static async deleteNote(req, res) {
        const { id } = req.body;
        const userData = await authController.getUserData(req, res);
        const noteData = await noteModel.findOneNote(id)
        if (userData.id === noteData.owner) {
            const deletedNote = await noteModel.deleteNote(id);
            res.json({ deletedNote });
        }
    }

    static async editNote(req, res) {
        const { title, desc } = req.body;
        if (title.length < 1 || desc.length < 1)
            return res.json({ error: "Complete all inputs" });
        const { id } = req.params;
        const editedNote = await noteModel.editNote(id, title, desc);
        res.json({ editedNote });
    }

    static async renderActualNote(req, res) {
        const note = await noteModel.editNote(req.params.id);
        const userData = await authController.getUserData(req, res);
        if (note.owner === userData.id) {
            res.render("editNote", {
                title: note.title,
                note: note.note,
            });
        } else {
            res.render("404");
        }
    }

    static async renderNewNote(req, res){
        res.render('newNote')
    }
}
