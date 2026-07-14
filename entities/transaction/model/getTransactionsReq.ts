import { TransactionType } from '@/shared/model';

export type GetTransactionsReq = {
  householdId: string;
  type?: TransactionType;
  categoryId?: string;
  /** YYYY-MM */
  yearMonth?: string;
};
