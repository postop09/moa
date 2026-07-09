import { createCategory, CreateCategoryReq } from '@/entities/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCategoryReq) => createCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
