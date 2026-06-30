import { calculateMonthlySummary } from '../lib/summary';
import { fetchMonthlyTransactions } from './fetchMonthlyTransactions';

export async function fetchMonthlySummary(referenceDate = new Date()) {
  const transactions = await fetchMonthlyTransactions(referenceDate);
  return calculateMonthlySummary(transactions);
}
