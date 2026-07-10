import { useQuery } from '@tanstack/react-query';

import { fetchDailyExpenses } from '@/entities/transaction';

import { transactionQueryKeys } from '../config/queryKeys';

export const useDailyExpenses = (householdId: string, date = new Date()) => {
  return useQuery({
    queryKey: transactionQueryKeys.dailyExpenses(householdId, date),
    queryFn: () => fetchDailyExpenses({ householdId, referenceDate: date }),
    enabled: !!householdId,
  });
};
