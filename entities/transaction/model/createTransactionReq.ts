import type { TransactionType } from './transactionType';

export type CreateTransactionReq = {
  householdId: string;
  name?: string;
  amount?: number;
  categoryId?: number;
  type?: TransactionType;
  transactionDt?: Date;
  memo?: string;
  isRecurring?: boolean;
  createdBy: string;
};
