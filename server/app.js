import app from "./index.js";
import "./db.js";

app.set("PORT", process.env.PORT || 3000);

app.listen(app.get("PORT"), () => {
    console.log(`Server started on port ${app.get("PORT")}`);
});
