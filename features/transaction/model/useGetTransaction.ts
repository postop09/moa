import { useQuery } from '@tanstack/react-query';

import {
  getTransaction,
  type GetTransactionsReq,
} from '@/entities/transaction';

import { transactionQueryKeys } from '../config/queryKeys';

export const useGetTransaction = (payload?: GetTransactionsReq) => {
  return useQuery({
    queryKey: transactionQueryKeys.list(payload),
    queryFn: () => getTransaction(payload!),
    enabled: !!payload?.householdId,
  });
};
