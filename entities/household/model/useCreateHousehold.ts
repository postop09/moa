import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/entities/auth';

import { createHousehold } from '../api/createHousehold';
import type { CreateHouseholdReq } from './createHouseholdReq';

type CreateHouseholdPayload = Pick<CreateHouseholdReq, 'name'>;

export const useCreateHousehold = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();
  const userId = session?.user.id;

  return useMutation({
    mutationFn: (payload: CreateHouseholdPayload) =>
      createHousehold({ ...payload, userId: userId! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['households'] });
    },
  });
};
