import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { deleteCategory } from '@/entities/category';

import { categoryQueryKeys } from '../config/queryKeys';

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
    },
    onError: (error) => {
      Alert.alert(
        '삭제 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });

  const handleDelete = (categoryId: number, categoryName: string) => {
    Alert.alert('카테고리 삭제', `'${categoryName}' 항목을 삭제할까요?`, [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제하기',
        style: 'destructive',
        onPress: () => mutation.mutate(categoryId),
      },
    ]);
  };

  return {
    ...mutation,
    handleDelete,
  };
};
