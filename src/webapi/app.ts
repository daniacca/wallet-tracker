import express from "express";
import cors from "cors";
import connectDB, { testConnection } from "./config/db.js";
import config from "./config/env.js";
import swaggerUi from "swagger-ui-express";
import logger from "morgan";
import { RegisterRoutes } from "./routes/routes.js";
import { ValidateError } from "tsoa";
import { Request as ExRequest, Response as ExResponse, NextFunction } from "express";

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

// HTTP middleware request logger
app.use(logger("dev"));

// CORS middleware
app.use(cors({ origin: "*" }));

// Parse requests of content-type - application/json
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// static files - public folder
app.use(express.static("public"));

// base route
app.get("/", (_, res) => {
  res.send({ message: "Welcome to the Web API" });
});

// health check route
app.get("/health", (_, res) => {
  if (testConnection() !== 1) {
    res.status(500).send({ status: "KO", message: "DB is down!" });
    return;
  }
  res.send({ status: "OK", message: "Server is up and all systems running" });
});

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

RegisterRoutes(app);

// Handle not found route
app.use((_req, res: ExResponse) => {
  res.status(404).send({
    message: "Not Found",
  });
});

// General Error Handler Middleware
app.use((err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

app.listen(port, () => {
  return console.log(`Server is running at http://localhost:${port}`);
});
