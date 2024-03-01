import mongoose from "../db.js";

const noteSchema = new mongoose.Schema(
    {
        owner: String,
        title: String,
        note: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Note", noteSchema);
