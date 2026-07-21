import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { createCategory, type CreateCategoryReq } from '@/entities/categories';

import { categoryQueryKeys } from '../config/queryKeys';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCategoryReq) => createCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
    },
    onError: (error) => {
      Alert.alert(
        '저장 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });
};
