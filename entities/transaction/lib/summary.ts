import type { CategoryExpense } from '../model/categoryExpense';
import type { DailyExpense } from '../model/dailyExpense';
import type { MonthlySummary } from '../model/monthlySummary';
import type { Transaction } from '../model/transaction';

export function calculateMonthlySummary(
  transactions: Transaction[],
): MonthlySummary {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    income,
    expense,
    balance: income - expense,
  };
}

export function calculateDailyExpenses(
  transactions: Transaction[],
  days = 7,
): DailyExpense[] {
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
  const today = new Date();

  return Array.from({ length: days }, (_, index) => {
    const offset = days - 1 - index;
    const date = new Date(today);
    date.setDate(date.getDate() - offset);
    const dateKey = date.toISOString().slice(0, 10);

    const value = transactions
      .filter((t) => t.type === 'expense' && t.transactionDate === dateKey)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      label: dayLabels[date.getDay()],
      value,
    };
  });
}

export function calculateCategoryExpenses(
  transactions: Transaction[],
): CategoryExpense[] {
  const categoryMap = new Map<string, number>();

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const name = t.categoryName ?? '기타';
      categoryMap.set(name, (categoryMap.get(name) ?? 0) + t.amount);
    });

  const colors = [
    '#EF4444',
    '#F97316',
    '#EAB308',
    '#8B5CF6',
    '#06B6D4',
    '#64748B',
  ];

  return Array.from(categoryMap.entries()).map(([name, value], index) => ({
    name,
    value,
    color: colors[index % colors.length],
  }));
}
