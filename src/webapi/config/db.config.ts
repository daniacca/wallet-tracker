import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const url =
  DB_USER && DB_PASSWORD && DB_HOST && DB_PORT && DB_NAME
    ? `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
    : "mongodb://127.0.0.1/wallet-db";

mongoose.set("strictQuery", false);

export const db = mongoose.connection;

export function disconnectDB() {
  return mongoose.disconnect();
}

export function testConnection() {
  return mongoose.connection.readyState;
}

export default async function connectDB() {
  await mongoose.connect(url);
}
