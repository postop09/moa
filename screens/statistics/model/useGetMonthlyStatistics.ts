import { useState } from 'react';

import { useGetCategories } from '@/features/category';
import { useGetTransactions } from '@/features/transaction';
import { useHouseholdStore } from '@/entities/households';

import { toYearMonth } from '../lib/yearMonth';

export const useGetMonthlyStatistics = () => {
  const { selectedHouseholdId } = useHouseholdStore();
  const [yearMonth, setYearMonth] = useState(toYearMonth);

  const transactionsQuery = useGetTransactions(
    selectedHouseholdId
      ? { householdId: selectedHouseholdId, yearMonth }
      : undefined,
  );

  const categoriesQuery = useGetCategories(
    selectedHouseholdId ?? '',
    'expense',
  );

  const isLoading =
    transactionsQuery.isLoading ||
    (!!selectedHouseholdId && categoriesQuery.isLoading);

  return {
    yearMonth,
    setYearMonth,
    transactions: transactionsQuery.data ?? [],
    categories: categoriesQuery.categories.expense,
    isLoading,
    isRefetching:
      transactionsQuery.isRefetching || categoriesQuery.isRefetching,
    hasHousehold: !!selectedHouseholdId,
  };
};
