import express from "express";
import cors from "cors";
import connectDB, { testConnection } from "./config/db.js";
import config from "./config/env.js";

connectDB()
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const app = express();
const port = config.server.port;

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
    res.status(500).send({ status: "KO", message: "Server is down" });
    return;
  }
  res.send({ status: "OK", message: "Server is up and all systems running" });
});

app.listen(port, () => {
  return console.log(`Server is running at http://localhost:${port}`);
});
