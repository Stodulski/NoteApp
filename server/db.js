import mongoose from "mongoose";

const URI = process.env.URI || "mongodb://localhost:27017/CRUD";

mongoose
    .connect(URI)
    .then(() => {
        console.log("Database connected");
    })
    .catch((e) => {
        console.error(e);
    });

export default mongoose;
