import jwt from "jsonwebtoken";
import User from "../schemas/user.js";
import { userModel } from "../model/user.js";

export class authController {
    static async signup(req, res) {
        let { username, password, repassword } = req.body;
        if (username.indexOf(" ") > -1 || password.indexOf(" ") > -1)
            return res.json({ error: "Don't use spaces." });
        if (username.length < 3 || password.length < 6)
            return res.json({ error: "Username or password very short." });
        username = username.toLowerCase();
        password = password.toLowerCase();
        repassword = repassword.toLowerCase();
        if (password !== repassword)
            return res.json({ error: "Passwords don't match." });
        const search = await userModel.findByUserSecure(username);
        if (search) return res.json({ error: "Username busy." });
        const savedUser = await userModel.createUser(username, password);
        const token = jwt.sign(
            {
                id: savedUser._id,
                username: savedUser.username,
            },
            process.env.SECRET || "secret",
            {
                expiresIn: "48h",
            }
        );
        res.cookie("x-access-token", `Bearer ${token}`);
        res.send("success");
    }

    static async signin(req, res) {
        let { username, password } = req.body;
        username = username.toLowerCase();
        password = password.toLowerCase();
        const search = await userModel.findByUser(username);
        if (!search) return res.json({ error: "Username not found." });
        const comparedPassword = await User.comparePassword(
            password,
            search.password
        );
        if (!comparedPassword)
            return res.json({ error: "Incorrect password." });
        const token = jwt.sign(
            {
                id: search._id,
                username,
            },
            process.env.SECRET || "secret",
            {
                expiresIn: "48h",
            }
        );
        res.cookie("x-access-token", `Bearer ${token}`);
        res.send("success");
    }

    static async verifyToken(req, res, next) {
        let token = req.cookies["x-access-token"];
        if (!token) return res.render("form.pug");
        if (!token.startsWith("Bearer")) return res.render("form.pug");
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET || "secret");
        const search = await userModel.findByUserSecure(decoded.username);
        if (!search) return res.render("form.pug");
        next();
    }

    static async getUserData(req, res) {
        let token = req.cookies["x-access-token"];
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET || "secret");
        return decoded;
    }

    static async logout(req, res) {
        res.clearCookie("x-access-token").redirect("/");
    }
}
