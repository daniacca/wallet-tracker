import dotenv from "dotenv";
import findConfig from "find-config";

const dotenvPath = findConfig(".env");
dotenv.config({ path: dotenvPath });

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, SERVER_PORT, TOKEN_SECRET } = process.env;

const config = {
  db: {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    name: DB_NAME,
  },
  server: {
    port: SERVER_PORT || 3000,
    jwtToken: {
      secret: TOKEN_SECRET || "secret",
    },
  },
};

export default config;
