import { useQuery } from '@tanstack/react-query';

import {
  fetchCategoryExpenses,
  fetchDailyExpenses,
  fetchMonthlySummary,
  fetchMonthlyTransactions,
} from '@/entities/transaction';

import { transactionQueryKeys } from '../config/queryKeys';

export const useMonthlyTransactions = (
  householdId: string,
  date = new Date(),
) => {
  return useQuery({
    queryKey: transactionQueryKeys.monthly(householdId, date),
    queryFn: () =>
      fetchMonthlyTransactions({ householdId, referenceDate: date }),
    enabled: !!householdId,
  });
};

export const useMonthlySummary = (householdId: string, date = new Date()) => {
  return useQuery({
    queryKey: transactionQueryKeys.monthlySummary(householdId, date),
    queryFn: () => fetchMonthlySummary({ householdId, referenceDate: date }),
    enabled: !!householdId,
  });
};

export const useDailyExpenses = (householdId: string, date = new Date()) => {
  return useQuery({
    queryKey: transactionQueryKeys.dailyExpenses(householdId, date),
    queryFn: () => fetchDailyExpenses({ householdId, referenceDate: date }),
    enabled: !!householdId,
  });
};

export const useCategoryExpenses = (householdId: string, date = new Date()) => {
  return useQuery({
    queryKey: transactionQueryKeys.categoryExpenses(householdId, date),
    queryFn: () => fetchCategoryExpenses({ householdId, referenceDate: date }),
    enabled: !!householdId,
  });
};
