import type { TransactionType } from './transactionType';

export type UpdateTransactionReq = {
  id: string;
  categoryId?: number;
  name?: string;
  type?: TransactionType;
  amount?: number;
  memo?: string;
  transactionDt?: Date;
  isRecurring?: boolean;
};
