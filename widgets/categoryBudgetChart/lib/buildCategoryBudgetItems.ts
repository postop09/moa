import type { Category } from '@/entities/categories';
import type { Transaction } from '@/entities/transactions';

export type CategoryBudgetItem = {
  categoryId: number;
  categoryName: string;
  budget: number;
  spent: number;
};

export const buildCategoryBudgetItems = (
  categories: Category[],
  transactions: Transaction[],
): CategoryBudgetItem[] => {
  const spentByCategory = new Map<number, number>();

  transactions.forEach((transaction) => {
    if (transaction.type !== 'expense' || transaction.categoryId == null) {
      return;
    }

    const amount = transaction.amount ?? 0;
    if (amount <= 0) {
      return;
    }

    spentByCategory.set(
      transaction.categoryId,
      (spentByCategory.get(transaction.categoryId) ?? 0) + amount,
    );
  });

  return categories.map((category) => ({
    categoryId: category.id,
    categoryName: category.name,
    budget: category.budget ?? 0,
    spent: spentByCategory.get(category.id) ?? 0,
  }));
};
