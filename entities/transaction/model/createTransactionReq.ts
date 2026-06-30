import type { TransactionType } from './transactionType';

export type CreateTransactionReq = {
  name: string;
  amount: number;
  categoryId: string;
  type: TransactionType;
  transactionDate: string;
  memo: string | null;
  isRecurring: boolean;
};
