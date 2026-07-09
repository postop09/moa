import { updateCategory, UpdateCategoryReq } from '@/entities/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCategoryReq) => updateCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
