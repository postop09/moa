import type { Transaction } from '@/entities/transactions';

export type CategorySpending = {
  categoryId: number | null;
  categoryName: string;
  amount: number;
};

export const aggregateCategorySpending = (
  transactions: Transaction[],
): CategorySpending[] => {
  const totals = new Map<string, CategorySpending>();

  transactions.forEach((transaction) => {
    if (transaction.type !== 'expense') {
      return;
    }

    const amount = transaction.amount ?? 0;
    if (amount <= 0) {
      return;
    }

    const categoryId = transaction.categoryId ?? null;
    const categoryName = transaction.categoryName?.trim() || '미분류';
    const key =
      categoryId !== null ? String(categoryId) : `name:${categoryName}`;
    const existing = totals.get(key);

    if (existing) {
      existing.amount += amount;
      return;
    }

    totals.set(key, { categoryId, categoryName, amount });
  });

  return Array.from(totals.values()).sort((a, b) => b.amount - a.amount);
};
