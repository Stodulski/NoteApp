import User from "../schemas/user.js";

export class userModel {
    static async findByUserSecure(username) {
        const search = await User.findOne({ username }).select("-password");
        if (!search) return false;
        else return search;
    }
    
    static async findByUser(username) {
        const search = await User.findOne({ username });
        if (!search) return false;
        else return search;
    }

    static async createUser(username, password) {
        const newUser = new User({
            username,
            password,
        });
        return await newUser.save();
    }
}
