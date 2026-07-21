import { useQuery } from '@tanstack/react-query';

import {
  getTransactions,
  type GetTransactionsReq,
} from '@/entities/transactions';

import { transactionQueryKeys } from '../config/queryKeys';

export const useGetTransactions = (payload?: GetTransactionsReq) => {
  return useQuery({
    queryKey: transactionQueryKeys.list(payload),
    queryFn: () => getTransactions(payload!),
    enabled: !!payload?.householdId,
  });
};
