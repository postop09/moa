import type { TransactionType } from './TransactionType';

export type CreateCategoryReq = {
  householdId: string;
  name: string;
  type: TransactionType;
  budget?: number | null;
};
