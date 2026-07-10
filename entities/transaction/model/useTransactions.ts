import { useQuery } from '@tanstack/react-query';

import { fetchCategoryExpenses } from '../api/fetchCategoryExpenses';
import { fetchDailyExpenses } from '../api/fetchDailyExpenses';
import { fetchMonthlySummary } from '../api/fetchMonthlySummary';
import { fetchMonthlyTransactions } from '../api/fetchMonthlyTransactions';

const getMonthKey = (date = new Date()) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
};

export const useMonthlyTransactions = (
  householdId: string,
  date = new Date(),
) => {
  return useQuery({
    queryKey: ['transactions', householdId, getMonthKey(date)],
    queryFn: () =>
      fetchMonthlyTransactions({ householdId, referenceDate: date }),
    enabled: !!householdId,
  });
};

export const useMonthlySummary = (householdId: string, date = new Date()) => {
  return useQuery({
    queryKey: ['monthly-summary', householdId, getMonthKey(date)],
    queryFn: () => fetchMonthlySummary({ householdId, referenceDate: date }),
    enabled: !!householdId,
  });
};

export const useDailyExpenses = (householdId: string, date = new Date()) => {
  return useQuery({
    queryKey: ['daily-expenses', householdId, getMonthKey(date)],
    queryFn: () => fetchDailyExpenses({ householdId, referenceDate: date }),
    enabled: !!householdId,
  });
};

export const useCategoryExpenses = (householdId: string, date = new Date()) => {
  return useQuery({
    queryKey: ['category-expenses', householdId, getMonthKey(date)],
    queryFn: () => fetchCategoryExpenses({ householdId, referenceDate: date }),
    enabled: !!householdId,
  });
};
