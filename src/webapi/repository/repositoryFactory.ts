import { Document } from "mongoose";
import Transaction, { TransactionDocument } from "../models/transaction.js";
import User, { UserDocument } from "../models/user.js";
import { Repository } from "./repository.js";

export type Model = "User" | "Transaction";

export function repositoryFactory(model: Model): Repository<Document> {
  switch (model) {
    case "User":
      return new Repository<UserDocument>(User);
    case "Transaction":
      return new Repository<TransactionDocument>(Transaction);
    default:
      throw new Error("Invalid model!");
  }
}
