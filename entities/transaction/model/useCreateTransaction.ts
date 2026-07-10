import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTransaction } from '../api/createTransaction';
import type { CreateTransactionReq } from './createTransactionReq';
import { Alert } from 'react-native';

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
    onError: (error) => {
      console.log(error);
      Alert.alert(
        '생성 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });
};
