import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createCategory } from '../api/createCategory';
import type { CreateCategoryReq } from './createCategoryReq';

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCategoryReq) => createCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}
