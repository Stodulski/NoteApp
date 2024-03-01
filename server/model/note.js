import Note from "../schemas/note.js";

export class noteModel {
    static async searchNote(id) {
        const notes = await Note.find({ owner: id });
        return notes;
    }

    static async newNote(title, note, owner) {
        const newNote = new Note({
            owner,
            title,
            note,
        });
        return await newNote.save();
    }

    static async deleteNote(id) {
        try {
            const notes = await Note.findByIdAndDelete(id);
            return notes;
        } catch (e) {
            return false
        }
    }

    static async editNote(id, title, note) {
        try {
            const notes = await Note.findByIdAndUpdate(id, {
                note,
                title,
            });
            return notes;
        } catch (e) {
            return false;
        }
    }

    static async findOneNote(id) {
        try {
            const note = await Note.findById(id);
            return note;
        } catch (e) {
            return false;
        }
    }
}
