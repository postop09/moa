import { mockTransactions } from './mock-data';
import { getLocalTransactions } from './local-transactions';
import { getAllTransactionsForMonth } from './recurring';
import type { Transaction } from '../model/transaction';
export const getDemoTransactions = (
  referenceDate = new Date(),
): Transaction[] => {
  const allTransactions = [...getLocalTransactions(), ...mockTransactions];
  return getAllTransactionsForMonth(allTransactions, referenceDate);
};
