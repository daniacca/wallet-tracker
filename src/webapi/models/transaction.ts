import mongoose, { Schema, Document } from "mongoose";
import { ITransaction, TransactionType } from "./interfaces/ITransaction.js";

const TransactionSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  type: { type: String, required: true, enum: Object.values(TransactionType) },
  description: { type: String, maxlength: 100 },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export type TransactionDocument = ITransaction & Document;

const Transaction = mongoose.model<TransactionDocument>("Transaction", TransactionSchema);
export default Transaction;
