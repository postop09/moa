import type { CategoryType } from './categoryType';

export type Category = {
  id: number;
  householdId: string;
  name: string;
  type: CategoryType;
  budget?: number;
  createdAt: string;
};
