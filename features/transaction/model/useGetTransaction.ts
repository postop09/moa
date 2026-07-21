import { useQuery } from '@tanstack/react-query';

import { getTransaction } from '@/entities/transactions';

import { transactionQueryKeys } from '../config/queryKeys';

export const useGetTransaction = (id?: string) => {
  return useQuery({
    queryKey: transactionQueryKeys.detail(id ?? ''),
    queryFn: () => getTransaction(id!),
    enabled: !!id,
  });
};
