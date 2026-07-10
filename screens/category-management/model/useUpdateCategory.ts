import { updateCategory, UpdateCategoryReq } from '@/entities/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { useState } from 'react';

export const useUpdateCategory = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: UpdateCategoryReq) => updateCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
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
