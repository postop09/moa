export type TransactionType = 'income' | 'expense';

export type Category = {
  id: string;
  userId: string;
  name: string;
  type: TransactionType;
  icon: string | null;
  color: string | null;
  sortOrder: number;
};

export type Transaction = {
  id: string;
  userId: string;
  categoryId: string | null;
  categoryName?: string;
  type: TransactionType;
  amount: number;
  memo: string | null;
  transactionDate: string;
};

export type MonthlySummary = {
  income: number;
  expense: number;
  balance: number;
};

export type DailyExpense = {
  label: string;
  value: number;
};

export type CategoryExpense = {
  name: string;
  value: number;
  color: string;
};
