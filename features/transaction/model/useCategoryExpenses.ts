import { useQuery } from '@tanstack/react-query';

import { fetchCategoryExpenses } from '@/entities/transaction';

import { transactionQueryKeys } from '../config/queryKeys';

export const useCategoryExpenses = (householdId: string, date = new Date()) => {
  return useQuery({
    queryKey: transactionQueryKeys.categoryExpenses(householdId, date),
    queryFn: () => fetchCategoryExpenses({ householdId, referenceDate: date }),
    enabled: !!householdId,
  });
};
