import type { CategoryType } from './categoryType';

export type GetCategoriesReq = {
  householdId: string;
  type?: CategoryType;
};
