import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';

import { createCategory, type CreateCategoryReq } from '@/entities/category';
import { categoryQueryKeys } from '@/features/category';

export const useCreateCategory = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (payload: CreateCategoryReq) => createCategory(payload),
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
    ...mutate,
    isEditOpen,
    setIsEditOpen,
  };
};
