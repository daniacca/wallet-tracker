import express from "express";
import dotenv from "dotenv";
import findConfig from "find-config";
const dotenvPath = findConfig(".env");
dotenv.config({ path: dotenvPath });
const app = express();
const port = process.env.SERVER_PORT || 3000;
app.get("/", (_, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map