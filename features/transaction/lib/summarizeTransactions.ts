import type { Transaction } from '@/entities/transactions';

export const summarizeTransactions = (transactions?: Transaction[]) => {
  let income = 0;
  let expense = 0;

  transactions?.forEach((transaction) => {
    const amount = transaction.amount ?? 0;
    if (transaction.type === 'income') {
      income += amount;
    } else {
      expense += amount;
    }
  });

  return {
    income,
    expense,
    balance: income - expense,
  };
};
