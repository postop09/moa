import type { CategoryType } from './TransactionType';

export type UpdateCategoryReq = {
  id: string;
  name: string;
  type: CategoryType;
  budget?: number | null;
};
