import { calculateDailyExpenses } from '../lib/summary';
import { fetchMonthlyTransactions } from './fetchMonthlyTransactions';

export async function fetchDailyExpenses(referenceDate = new Date()) {
  const transactions = await fetchMonthlyTransactions(referenceDate);
  return calculateDailyExpenses(transactions);
}
