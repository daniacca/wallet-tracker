import express from "express";
import dotenv from "dotenv";
import findConfig from "find-config";
import cors from "cors";
import connectDB, { testConnection } from "./config/db.config.js";

const dotenvPath = findConfig(".env");
dotenv.config({ path: dotenvPath });

connectDB()
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const app = express();
const port = process.env.SERVER_PORT || 3000;

// Enable CORS
app.use(cors({ origin: "*" }));

// Parse requests of content-type - application/json
app.use(express.json());

// base route
app.get("/", (_, res) => {
  res.send({ message: "Welcome to the Web API" });
});

// health check route
app.get("/health", (_, res) => {
  if (testConnection() !== 1) {
    res.status(500).send({ message: "Server is down" });
    return;
  }
  res.send({ message: "Server is up and running" });
});

app.listen(port, () => {
  return console.log(`Server is running at http://localhost:${port}`);
});
