import type { TransactionType } from './transactionType';

export type GetTransactionsReq = {
  householdId: string;
  type?: TransactionType;
  referenceDate?: Date;
  startDate?: Date;
  endDate?: Date;
};
