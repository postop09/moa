import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';

import { updateCategory, type UpdateCategoryReq } from '@/entities/category';
import { categoryQueryKeys } from '@/features/category';

export const useUpdateCategory = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: UpdateCategoryReq) => updateCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
      setIsEditOpen(false);
    },
    onError: (error) => {
      Alert.alert(
        '저장 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });

  return {
    ...mutation,
    isEditOpen,
    setIsEditOpen,
  };
};
