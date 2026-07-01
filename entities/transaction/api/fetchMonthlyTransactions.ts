import { getDemoTransactions } from '../lib/getDemoTransactions';
import type { Transaction } from '../model/transaction';
export const fetchMonthlyTransactions = async (
  referenceDate = new Date(),
): Promise<Transaction[]> => {
  return getDemoTransactions(referenceDate);
};
