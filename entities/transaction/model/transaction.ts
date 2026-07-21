import type { TransactionType } from './transactionType';

export type Transaction = {
  id: string;
  householdId: string;
  categoryId?: number;
  categoryName?: string;
  name?: string;
  type?: TransactionType;
  amount?: number;
  isRecurring?: boolean;
  memo?: string;
  createdBy: string;
  createdDt: Date;
  updatedDt: Date;
  transactionDt?: Date;
};
