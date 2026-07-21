import type { CategoryType } from './categoryType';

export type UpdateCategoryReq = {
  id: number;
  name: string;
  type: CategoryType;
  budget?: number | null;
};
