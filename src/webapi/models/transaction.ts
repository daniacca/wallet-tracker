import mongoose, { Schema } from "mongoose";

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  description?: string;
  createdAt: Date;
  userId: string;
};

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  type: { type: String, required: true, enum: Object.values(TransactionType) },
  description: { type: String, maxlength: 100 },
  createdAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const TransactionModel = mongoose.model("Transaction", TransactionSchema);
export default TransactionModel;
