import {
  createTransaction,
  CreateTransactionReq,
} from '@/entities/transaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Alert } from 'react-native';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTransactionReq) => createTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
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
