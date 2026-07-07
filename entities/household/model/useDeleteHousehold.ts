import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteHousehold } from '../api/deleteHousehold';

export const useDeleteHousehold = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteHousehold(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['households'] });
    },
  });
};
