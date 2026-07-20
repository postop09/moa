import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { createHousehold, type CreateHouseholdReq } from '@/entities/household';
import { addHouseholdMember } from '@/entities/household-member';
import { householdQueryKeys } from '@/features/household';
import { householdMemberQueryKeys } from '@/features/household-member';
import { useAuthStore } from '@/shared/model';

type CreateHouseholdPayload = Pick<CreateHouseholdReq, 'name'>;

export const useCreateHousehold = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: CreateHouseholdPayload) => {
      const userId = session?.user.id || '';
      const household = await createHousehold({ ...payload, userId });
      await addHouseholdMember({
        householdId: household.id,
        userId,
        role: 'owner',
      });
      return household;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: householdQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: householdMemberQueryKeys.all });
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });
};