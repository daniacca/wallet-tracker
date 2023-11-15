import express from "express";
import cors from "cors";
import connectDB, { testConnection, waitConnection } from "./config/db.js";
import config from "./config/env.js";
import swaggerUi from "swagger-ui-express";
import logger from "morgan";
import { RegisterRoutes } from "./routes/routes.js";
import { ValidateError } from "tsoa";
import { Request, Response, NextFunction } from "express";
import { AuthenticationError } from "./middlewares/authentication.js";
import populateDb from "./scripts/populateDb.js";

connectDB()
  .then(() => {
    console.log("Successfully connected to DB");
    waitConnection().then((connected) => {
      if (connected)
        populateDb().then(() => {
          console.log("Successfully populated DB");
        });
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const app = express();

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
  if (!testConnection()) {
    res.status(500).send({ status: "KO", message: "DB is down!" });
    return;
  }
  res.send({ status: "OK", message: "Server is up and all systems running" });
});

// Swagger UI
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
app.use((_req, res: Response) => {
  res.status(404).send({
    message: "Not Found",
  });
});

// General Error Handler Middleware
app.use((err: unknown, req: Request, res: Response, next: NextFunction): Response | void => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }

  if (err instanceof AuthenticationError) {
    console.warn(`Caught Authentication Error for ${req.path}:`, err.message);
    return res.status(err.status).json({
      message: err.message || "Authentication Error",
    });
  }

  if (err instanceof Error) {
    console.error(`Caught General Error for ${req.path}:`, JSON.stringify(err));
    return res.status(err["status"] || 500).json({
      message: err.message || "Internal Server Error",
    });
  }

  next();
});

const port = config.server.port;

app.listen(port, () => {
  return console.log(`Server is running at http://localhost:${port}`);
});
