import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import {
  deleteTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
  type GetTransactionsReq,
  type UpdateTransactionReq,
} from '@/entities/transaction';

import { transactionQueryKeys } from '../config/queryKeys';
import { invalidateTransactionQueries } from '../lib/invalidateTransactionQueries';

export const useGetTransactions = (payload: GetTransactionsReq) => {
  return useQuery({
    queryKey: transactionQueryKeys.list(payload),
    queryFn: () => getTransactions(payload),
    enabled: !!payload.householdId,
  });
};

export const useGetTransaction = (id?: string) => {
  return useQuery({
    queryKey: transactionQueryKeys.detail(id),
    queryFn: () => getTransaction(id!),
    enabled: !!id,
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateTransactionReq) => updateTransaction(payload),
    onSuccess: () => {
      invalidateTransactionQueries(queryClient);
    },
    onError: (error) => {
      console.log(error);
      Alert.alert(
        '수정 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });
};

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
