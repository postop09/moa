import { useMemo, useState } from 'react';

import {
  summarizeTransactions,
  useGetTransactions,
} from '@/features/transaction';
import { useHouseholdStore } from '@/shared/model';

import { toYearMonth } from '../lib/yearMonth';

export const useGetMonthlyTransactions = () => {
  const { selectedHouseholdId } = useHouseholdStore();
  const [yearMonth, setYearMonth] = useState(toYearMonth);

  const { data, isLoading, isRefetching } = useGetTransactions(
    selectedHouseholdId
      ? { householdId: selectedHouseholdId, yearMonth }
      : undefined,
  );

  const summary = useMemo(() => summarizeTransactions(data), [data]);

  return {
    yearMonth,
    setYearMonth,
    transactions: data ?? [],
    isLoading,
    isRefetching,
    ...summary,
  };
};
