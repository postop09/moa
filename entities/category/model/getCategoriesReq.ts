import { TransactionType } from '@/shared/model';

export type GetCategoriesReq = {
  householdId: string;
  type?: TransactionType;
};
