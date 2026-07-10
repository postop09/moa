import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteTransaction } from '../api/deleteTransaction';
import { getTransaction } from '../api/getTransaction';
import { getTransactions } from '../api/getTransactions';
import { updateTransaction } from '../api/updateTransaction';
import type { GetTransactionsReq } from './getTransactionsReq';
import type { UpdateTransactionReq } from './updateTransactionReq';
import { Alert } from 'react-native';

const invalidateTransactionQueries = (
  queryClient: ReturnType<typeof useQueryClient>,
) => {
  queryClient.invalidateQueries({ queryKey: ['transactions'] });
  queryClient.invalidateQueries({ queryKey: ['monthly-summary'] });
  queryClient.invalidateQueries({ queryKey: ['daily-expenses'] });
  queryClient.invalidateQueries({ queryKey: ['category-expenses'] });
};

export const useGetTransactions = (payload: GetTransactionsReq) => {
  return useQuery({
    queryKey: ['transactions', payload],
    queryFn: () => getTransactions(payload),
    enabled: !!payload.householdId,
  });
};

export const useGetTransaction = (id?: string) => {
  return useQuery({
    queryKey: ['transaction', id],
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
