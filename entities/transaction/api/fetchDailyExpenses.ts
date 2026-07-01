import { calculateDailyExpenses } from '../lib/summary';
import { fetchMonthlyTransactions } from './fetchMonthlyTransactions';
export const fetchDailyExpenses = async (referenceDate = new Date()) => {
  const transactions = await fetchMonthlyTransactions(referenceDate);
  return calculateDailyExpenses(transactions);
};
