import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateCategory } from '../api/updateCategory';
import type { UpdateCategoryReq } from './updateCategoryReq';

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCategoryReq) => updateCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
