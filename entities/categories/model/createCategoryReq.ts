import type { CategoryType } from './categoryType';

export type CreateCategoryReq = {
  householdId: string;
  name: string;
  type: CategoryType;
  budget?: number | null;
};
