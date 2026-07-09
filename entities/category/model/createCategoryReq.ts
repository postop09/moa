import type { CategoryType } from './TransactionType';

export type CreateCategoryReq = {
  name: string;
  type: CategoryType;
  budget?: number | null;
};
