import { Alert } from 'react-native';

import { useDeleteTransaction as useDeleteTransactionMutation } from '@/features/transaction';

export const useDeleteTransaction = () => {
  const mutation = useDeleteTransactionMutation();

  const handleDelete = (id: string, name?: string) => {
    Alert.alert(
      '거래 삭제',
      `'${name || '거래'}' 항목을 삭제할까요?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제하기',
          style: 'destructive',
          onPress: () => mutation.mutate(id),
        },
      ],
    );
  };

  return {
    ...mutation,
    handleDelete,
  };
};
