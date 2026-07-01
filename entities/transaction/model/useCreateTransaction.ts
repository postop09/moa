import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTransaction } from '../api/createTransaction';
import type { CreateTransactionReq } from './createTransactionReq';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTransactionReq) => createTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['monthly-summary'] });
      queryClient.invalidateQueries({ queryKey: ['daily-expenses'] });
      queryClient.invalidateQueries({ queryKey: ['category-expenses'] });
    },
  });
};
