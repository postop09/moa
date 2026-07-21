import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import {
  updateTransaction,
  type UpdateTransactionReq,
} from '@/entities/transactions';

import { invalidateTransactionQueries } from '../lib/invalidateTransactionQueries';

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateTransactionReq) => updateTransaction(payload),
    onSuccess: () => {
      invalidateTransactionQueries(queryClient);
    },
    onError: (error) => {
      Alert.alert(
        '수정 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });
};
