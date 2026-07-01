import { calculateCategoryExpenses } from '../lib/summary';
import { fetchMonthlyTransactions } from './fetchMonthlyTransactions';
export const fetchCategoryExpenses = async (referenceDate = new Date()) => {
  const transactions = await fetchMonthlyTransactions(referenceDate);
  return calculateCategoryExpenses(transactions);
};
