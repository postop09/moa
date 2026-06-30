import type { CategoryType } from './categoryType';

export type UpdateCategoryReq = {
  id: string;
  name: string;
  type: CategoryType;
  budget?: number | null;
};
