import type { Transaction } from '@/entities/transactions';

export type DailyExpense = {
  day: number;
  label: string;
  amount: number;
};

const getDaysInMonth = (yearMonth: string) => {
  const [year, month] = yearMonth.split('-').map(Number);
  return new Date(year, month, 0).getDate();
};

export const aggregateDailyExpense = (
  transactions: Transaction[],
  yearMonth: string,
): DailyExpense[] => {
  const daysInMonth = getDaysInMonth(yearMonth);
  const totals = Array.from({ length: daysInMonth }, (_, index) => ({
    day: index + 1,
    label: String(index + 1),
    amount: 0,
  }));

  const [year, month] = yearMonth.split('-').map(Number);

  transactions.forEach((transaction) => {
    if (transaction.type === 'income' || !transaction.transactionDt) {
      return;
    }

    const amount = transaction.amount ?? 0;
    if (amount <= 0) {
      return;
    }

    const date = new Date(transaction.transactionDt);
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month) {
      return;
    }

    const day = date.getDate();
    if (day < 1 || day > daysInMonth) {
      return;
    }

    totals[day - 1].amount += amount;
  });

  return totals;
};
