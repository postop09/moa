import { useQuery } from '@tanstack/react-query';

import { fetchMonthlyTransactions } from '@/entities/transaction';

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
