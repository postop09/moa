import { Colors } from '@/shared/config';
import type { CategoryType } from '../model/categoryType';
export const getDefaultColor = (type: CategoryType) => {
  return type === 'income' ? Colors.light.income : Colors.light.expense;
};
export const normalizeBudget = (budget?: number | null) => {
  if (budget === undefined || budget === null || budget <= 0) {
    return null;
  }
  return budget;
};
