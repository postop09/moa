import type { TransactionType } from '@/shared/model';

export type Transaction = {
  id: string;
  householdId: string;
  categoryId?: number;
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
