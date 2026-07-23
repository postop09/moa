import { useMemo, useState } from 'react';

import { useGetCategories } from '@/features/category';
import { useGetTransactions } from '@/features/transaction';
import { useHouseholdStore } from '@/entities/households';

import { parseYearMonth, toYearMonth } from '../lib/yearMonth';

export const useGetMonthlyStatistics = () => {
  const { selectedHouseholdId } = useHouseholdStore();
  const [yearMonth, setYearMonth] = useState(toYearMonth);
  const year = useMemo(() => parseYearMonth(yearMonth).year, [yearMonth]);

  const transactionsQuery = useGetTransactions(
    selectedHouseholdId
      ? { householdId: selectedHouseholdId, yearMonth }
      : undefined,
  );

  const yearlyTransactionsQuery = useGetTransactions(
    selectedHouseholdId
      ? { householdId: selectedHouseholdId, year }
      : undefined,
  );

  const categoriesQuery = useGetCategories(
    selectedHouseholdId ?? '',
    'expense',
  );

  const isLoading =
    transactionsQuery.isLoading ||
    yearlyTransactionsQuery.isLoading ||
    (!!selectedHouseholdId && categoriesQuery.isLoading);

  return {
    yearMonth,
    year,
    setYearMonth,
    transactions: transactionsQuery.data ?? [],
    yearlyTransactions: yearlyTransactionsQuery.data ?? [],
    categories: categoriesQuery.categories.expense,
    isLoading,
    isRefetching:
      transactionsQuery.isRefetching ||
      yearlyTransactionsQuery.isRefetching ||
      categoriesQuery.isRefetching,
    hasHousehold: !!selectedHouseholdId,
  };
};
