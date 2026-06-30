import type { TransactionType } from './transactionType';

export type Transaction = {
  id: string;
  userId: string;
  categoryId: string | null;
  categoryName?: string;
  name: string;
  type: TransactionType;
  amount: number;
  memo: string | null;
  transactionDate: string;
  isRecurring: boolean;
};
