import { getDemoTransactions } from '../lib/getDemoTransactions';
import type { Transaction } from '../model/transaction';

export async function fetchMonthlyTransactions(
  referenceDate = new Date(),
): Promise<Transaction[]> {
  return getDemoTransactions(referenceDate);
}
