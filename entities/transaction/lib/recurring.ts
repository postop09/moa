import type { Transaction } from '../model/transaction';
const toISODate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const parseISODate = (value: string): Date => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};
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
  if (!template.isRecurring) {
    return null;
  }
  const templateDate = parseISODate(template.transactionDate);
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
  const projectedISO = toISODate(projectedDate);
  return {
    ...template,
    id: `${template.id}-projected-${projectedISO}`,
    transactionDate: projectedISO,
  };
};
export const expandRecurringTransactions = (
  transactions: Transaction[],
  referenceDate: Date,
): Transaction[] => {
  const { start, end } = getMonthRange(referenceDate);
  const startISO = toISODate(start);
  const endISO = toISODate(end);
  const inMonth = transactions.filter(
    (transaction) =>
      transaction.transactionDate >= startISO &&
      transaction.transactionDate <= endISO,
  );
  const recurringTemplates = transactions.filter(
    (transaction) =>
      transaction.isRecurring && transaction.transactionDate < startISO,
  );
  const projected = recurringTemplates
    .map((template) => projectRecurringTransaction(template, referenceDate))
    .filter((transaction): transaction is Transaction => transaction !== null);
  return [...inMonth, ...projected].sort((a, b) =>
    b.transactionDate.localeCompare(a.transactionDate),
  );
};
export const getAllTransactionsForMonth = (
  allTransactions: Transaction[],
  referenceDate: Date,
): Transaction[] => {
  return expandRecurringTransactions(allTransactions, referenceDate);
};
