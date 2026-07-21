import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { createHousehold, type CreateHouseholdReq } from '@/entities/household';
import { addHouseholdMember } from '@/entities/household-member';
import { useAuthStore } from '@/shared/model';

import { householdQueryKeys } from '../config/queryKeys';

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
      queryClient.invalidateQueries({ queryKey: ['household-members'] });
    },
    onError: (error) => {
      Alert.alert(
        '가계부 생성 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });
};
