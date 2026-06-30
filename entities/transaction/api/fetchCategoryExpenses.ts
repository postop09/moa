import { calculateCategoryExpenses } from '../lib/summary';
import { fetchMonthlyTransactions } from './fetchMonthlyTransactions';

export async function fetchCategoryExpenses(referenceDate = new Date()) {
  const transactions = await fetchMonthlyTransactions(referenceDate);
  return calculateCategoryExpenses(transactions);
}
