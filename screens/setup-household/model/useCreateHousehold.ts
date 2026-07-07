import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/shared/model';
import { createHousehold, CreateHouseholdReq } from '@/entities/household';
import { Alert } from 'react-native';

type CreateHouseholdPayload = Pick<CreateHouseholdReq, 'name'>;

export const useCreateHousehold = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();

  return useMutation({
    mutationFn: (payload: CreateHouseholdPayload) =>
      createHousehold({ ...payload, userId: session?.user.id || '' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['households'] });
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });
};
