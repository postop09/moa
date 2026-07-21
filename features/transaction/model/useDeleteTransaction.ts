import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { deleteTransaction } from '@/entities/transaction';

import { invalidateTransactionQueries } from '../lib/invalidateTransactionQueries';

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      invalidateTransactionQueries(queryClient);
    },
    onError: (error) => {
      console.log(error);
      Alert.alert(
        '삭제 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });
};
