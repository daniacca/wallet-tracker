import { IEntitiy } from "./IEntity.js";

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export interface ITransaction extends IEntitiy {
  amount: number;
  type: TransactionType;
  description?: string;
  userId: string;
}
