import type { CategoryType } from './categoryType';

export type CreateCategoryReq = {
  name: string;
  type: CategoryType;
  budget?: number | null;
};
