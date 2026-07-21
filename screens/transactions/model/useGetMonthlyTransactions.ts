import { useMemo, useState } from 'react';
import { useHouseholdStore } from '@/shared/model';
import { toYearMonth } from '../lib/yearMonth';
import { useGetTransactions } from '@/features/transaction';

export const useGetMonthlyTransactions = () => {
  const { selectedHouseholdId } = useHouseholdStore();
  const [yearMonth, setYearMonth] = useState(toYearMonth);

  const { data, isLoading, isRefetching } = useGetTransactions(
    selectedHouseholdId
      ? { householdId: selectedHouseholdId, yearMonth }
      : undefined,
  );

  const summary = useMemo(() => {
    let income = 0;
    let expense = 0;

    data?.forEach((transaction) => {
      const amount = transaction.amount ?? 0;
      if (transaction.type === 'income') {
        income += amount;
      } else {
        expense += amount;
      }
    });

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [data]);

  return {
    yearMonth,
    setYearMonth,
    transactions: data ?? [],
    isLoading,
    isRefetching,
    ...summary,
  };
};
