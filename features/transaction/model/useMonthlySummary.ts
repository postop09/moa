import { useQuery } from '@tanstack/react-query';

import { fetchMonthlySummary } from '@/entities/transaction';

import { transactionQueryKeys } from '../config/queryKeys';

export const useMonthlySummary = (householdId: string, date = new Date()) => {
  return useQuery({
    queryKey: transactionQueryKeys.monthlySummary(householdId, date),
    queryFn: () => fetchMonthlySummary({ householdId, referenceDate: date }),
    enabled: !!householdId,
  });
};
