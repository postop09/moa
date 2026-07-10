import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteHousehold } from '@/entities/household';

import { householdQueryKeys } from '../config/queryKeys';

export const useDeleteHousehold = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteHousehold(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: householdQueryKeys.all });
    },
  });
};
