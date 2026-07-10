import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import {
  createTransaction,
  type CreateTransactionReq,
} from '@/entities/transaction';

import { invalidateTransactionQueries } from '../lib/invalidateTransactionQueries';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTransactionReq) => createTransaction(payload),
    onSuccess: () => {
      invalidateTransactionQueries(queryClient);
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
