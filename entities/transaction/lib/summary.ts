import type { CategoryExpense } from '../model/categoryExpense';
import type { DailyExpense } from '../model/dailyExpense';
import type { MonthlySummary } from '../model/monthlySummary';
import type { Transaction } from '../model/transaction';
import { toTransactionDateKey } from './transactionDate';

export const calculateMonthlySummary = (
  transactions: Transaction[],
): MonthlySummary => {
  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + (transaction.amount ?? 0), 0);
  const expense = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + (transaction.amount ?? 0), 0);

  return {
    income,
    expense,
    balance: income - expense,
  };
};

export const calculateDailyExpenses = (
  transactions: Transaction[],
  days = 7,
): DailyExpense[] => {
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
  const today = new Date();

  return Array.from({ length: days }, (_, index) => {
    const offset = days - 1 - index;
    const date = new Date(today);
    date.setDate(date.getDate() - offset);
    const dateKey = toTransactionDateKey(date);
    const value = transactions
      .filter(
        (transaction) =>
          transaction.type === 'expense' &&
          toTransactionDateKey(transaction.transactionDt) === dateKey,
      )
      .reduce((sum, transaction) => sum + (transaction.amount ?? 0), 0);

    return {
      label: dayLabels[date.getDay()],
      value,
    };
  });
};

export const calculateCategoryExpenses = (
  transactions: Transaction[],
): CategoryExpense[] => {
  const categoryMap = new Map<string, number>();

  transactions
    .filter((transaction) => transaction.type === 'expense')
    .forEach((transaction) => {
      const name =
        transaction.categoryId != null
          ? `카테고리 ${transaction.categoryId}`
          : '기타';
      categoryMap.set(
        name,
        (categoryMap.get(name) ?? 0) + (transaction.amount ?? 0),
      );
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
};
