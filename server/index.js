import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(cookieParser(process.env.SECRET || "secret"));
app.use(express.urlencoded({ extended: false }));

// serving static files
app.use(express.static("./server/public"));

// template engine
app.set("view engine", "pug");

// routes
import authRoutes from "./routes/authRoutes.js";
import mainRoutes from "./routes/mainRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

app.use(authRoutes);
app.use(noteRoutes);
app.use(mainRoutes);

export default app;
