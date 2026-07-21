export type TransactionType = 'income' | 'expense';

export const TRANSACTION_TYPES = ['income', 'expense'] as const;

export const isTransactionType = (value: unknown): value is TransactionType => {
  return value === 'income' || value === 'expense';
};
