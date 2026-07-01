import { useQuery } from '@tanstack/react-query';
import { fetchCategoryExpenses } from '../api/fetchCategoryExpenses';
import { fetchDailyExpenses } from '../api/fetchDailyExpenses';
import { fetchMonthlySummary } from '../api/fetchMonthlySummary';
import { fetchMonthlyTransactions } from '../api/fetchMonthlyTransactions';
const getMonthKey = (date = new Date()) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
};
export const useMonthlyTransactions = (date = new Date()) => {
  return useQuery({
    queryKey: ['transactions', getMonthKey(date)],
    queryFn: () => fetchMonthlyTransactions(date),
  });
};
export const useMonthlySummary = (date = new Date()) => {
  return useQuery({
    queryKey: ['monthly-summary', getMonthKey(date)],
    queryFn: () => fetchMonthlySummary(date),
  });
};
export const useDailyExpenses = (date = new Date()) => {
  return useQuery({
    queryKey: ['daily-expenses', getMonthKey(date)],
    queryFn: () => fetchDailyExpenses(date),
  });
};
export const useCategoryExpenses = (date = new Date()) => {
  return useQuery({
    queryKey: ['category-expenses', getMonthKey(date)],
    queryFn: () => fetchCategoryExpenses(date),
  });
};
