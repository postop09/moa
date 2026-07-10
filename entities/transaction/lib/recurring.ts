import type { Transaction } from '../model/transaction';
import { toTransactionDateKey } from './transactionDate';

const getMonthRange = (referenceDate: Date) => {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);

  return { start, end };
};

export const projectRecurringTransaction = (
  template: Transaction,
  referenceDate: Date,
): Transaction | null => {
  if (!template.isRecurring || !template.transactionDt) {
    return null;
  }

  const templateDate = new Date(template.transactionDt);
  const { start: monthStart, end: monthEnd } = getMonthRange(referenceDate);

  if (templateDate > monthEnd) {
    return null;
  }

  if (templateDate >= monthStart && templateDate <= monthEnd) {
    return null;
  }

  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const lastDay = monthEnd.getDate();
  const projectedDay = Math.min(templateDate.getDate(), lastDay);
  const projectedDate = new Date(year, month, projectedDay);

  return {
    ...template,
    id: `${template.id}-projected-${toTransactionDateKey(projectedDate)}`,
    transactionDt: projectedDate,
  };
};

export const expandRecurringTransactions = (
  transactions: Transaction[],
  referenceDate: Date,
): Transaction[] => {
  const { start, end } = getMonthRange(referenceDate);
  const startISO = toTransactionDateKey(start);
  const endISO = toTransactionDateKey(end);
  const inMonth = transactions.filter((transaction) => {
    const dateKey = toTransactionDateKey(transaction.transactionDt);

    return dateKey >= startISO && dateKey <= endISO;
  });
  const recurringTemplates = transactions.filter((transaction) => {
    const dateKey = toTransactionDateKey(transaction.transactionDt);

    return transaction.isRecurring && dateKey < startISO;
  });
  const projected = recurringTemplates
    .map((template) => projectRecurringTransaction(template, referenceDate))
    .filter((transaction): transaction is Transaction => transaction !== null);

  return [...inMonth, ...projected].sort((a, b) => {
    const aDate = toTransactionDateKey(a.transactionDt);
    const bDate = toTransactionDateKey(b.transactionDt);

    return bDate.localeCompare(aDate);
  });
};

export const getAllTransactionsForMonth = (
  allTransactions: Transaction[],
  referenceDate: Date,
): Transaction[] => {
  return expandRecurringTransactions(allTransactions, referenceDate);
};
