import { useMemo } from 'react';

import {
  summarizeTransactions,
  toYearMonth,
  useGetTransactions,
} from '@/features/transaction';
import { useHouseholdStore } from '@/entities/households';

export const useGetBalance = () => {
  const { selectedHouseholdId } = useHouseholdStore();
  const yearMonth = toYearMonth();

  const { data, isLoading } = useGetTransactions(
    selectedHouseholdId
      ? { householdId: selectedHouseholdId, yearMonth }
      : undefined,
  );

  const summary = useMemo(() => summarizeTransactions(data), [data]);

  return { ...summary, isLoading };
};
