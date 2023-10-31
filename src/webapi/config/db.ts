import mongoose from "mongoose";
import config from "./env.js";

const { host, name, password, port, user } = config.db;

const url =
  user && password && host && port && name ? `mongodb://${user}:${password}@${host}:${port}/${name}?authSource=admin` : "mongodb://127.0.0.1/wallet-db";

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
