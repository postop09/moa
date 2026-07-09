import { Colors } from '@/shared/config';
import { TransactionType } from '@/shared/model';

export const getDefaultColor = (type: TransactionType) => {
  return type === 'income' ? Colors.light.income : Colors.light.expense;
};

export const normalizeBudget = (budget?: number | null) => {
  if (budget === undefined || budget === null || budget <= 0) {
    return null;
  }
  return budget;
};
