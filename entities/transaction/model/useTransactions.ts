import { useQuery } from '@tanstack/react-query';

import { fetchCategoryExpenses } from '../api/fetchCategoryExpenses';
import { fetchDailyExpenses } from '../api/fetchDailyExpenses';
import { fetchMonthlySummary } from '../api/fetchMonthlySummary';
import { fetchMonthlyTransactions } from '../api/fetchMonthlyTransactions';

function getMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
}

export function useMonthlyTransactions(date = new Date()) {
  return useQuery({
    queryKey: ['transactions', getMonthKey(date)],
    queryFn: () => fetchMonthlyTransactions(date),
  });
}

export function useMonthlySummary(date = new Date()) {
  return useQuery({
    queryKey: ['monthly-summary', getMonthKey(date)],
    queryFn: () => fetchMonthlySummary(date),
  });
}

export function useDailyExpenses(date = new Date()) {
  return useQuery({
    queryKey: ['daily-expenses', getMonthKey(date)],
    queryFn: () => fetchDailyExpenses(date),
  });
}

export function useCategoryExpenses(date = new Date()) {
  return useQuery({
    queryKey: ['category-expenses', getMonthKey(date)],
    queryFn: () => fetchCategoryExpenses(date),
  });
}
