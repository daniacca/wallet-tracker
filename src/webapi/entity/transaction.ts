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
