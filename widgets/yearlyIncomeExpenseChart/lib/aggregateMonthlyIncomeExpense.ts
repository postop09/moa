import type { Transaction } from '@/entities/transactions';

export type MonthlyIncomeExpense = {
  month: number;
  label: string;
  income: number;
  expense: number;
};

export const aggregateMonthlyIncomeExpense = (
  transactions: Transaction[],
  year: number,
): MonthlyIncomeExpense[] => {
  const totals = Array.from({ length: 12 }, (_, index) => ({
    month: index + 1,
    label: String(index + 1),
    income: 0,
    expense: 0,
  }));

  transactions.forEach((transaction) => {
    if (!transaction.transactionDt) {
      return;
    }

    const amount = transaction.amount ?? 0;
    if (amount <= 0) {
      return;
    }

    const date = new Date(transaction.transactionDt);
    if (date.getFullYear() !== year) {
      return;
    }

    const month = date.getMonth();
    if (transaction.type === 'income') {
      totals[month].income += amount;
      return;
    }

    totals[month].expense += amount;
  });

  return totals;
};
