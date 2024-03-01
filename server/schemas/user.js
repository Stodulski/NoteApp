import mongoose from "../db.js";
import cryptoJS from "crypto-js";

const userSchema = new mongoose.Schema(
    {
        username: {
            unique: true,
            type: String,
        },
        password: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.statics.comparePassword = async (password, savedPassword) => {
    try {
        var bytes = cryptoJS.AES.decrypt(
            savedPassword,
            process.env.SECRET || "secret"
        );
        let originalPassword = bytes.toString(cryptoJS.enc.Utf8);
        if (originalPassword === password) return true;
        else return false;
    } catch (e) {
        console.error(e);
    }
};

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    const hash = cryptoJS.AES.encrypt(
        user.password,
        process.env.SECRET || "secret"
    ).toString();
    user.password = hash;
    next();
});

export default mongoose.model("User", userSchema);
