export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export interface ITransaction {
  _id: string;
  amount: number;
  type: TransactionType;
  description?: string;
  createdAt: Date;
  userId: string;
}
