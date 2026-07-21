import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { updateCategory, type UpdateCategoryReq } from '@/entities/categories';

import { categoryQueryKeys } from '../config/queryKeys';

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCategoryReq) => updateCategory(payload),
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
