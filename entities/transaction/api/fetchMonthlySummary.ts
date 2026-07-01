import { calculateMonthlySummary } from '../lib/summary';
import { fetchMonthlyTransactions } from './fetchMonthlyTransactions';
export const fetchMonthlySummary = async (referenceDate = new Date()) => {
  const transactions = await fetchMonthlyTransactions(referenceDate);
  return calculateMonthlySummary(transactions);
};
