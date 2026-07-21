import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { useAuthStore } from '@/entities/auth';
import {
  createHousehold,
  type CreateHouseholdReq,
} from '@/entities/households';
import { householdMemberQueryKeys } from '@/entities/household-members';

import { householdQueryKeys } from '../config/queryKeys';

type CreateHouseholdPayload = Pick<CreateHouseholdReq, 'name'>;

export const useCreateHousehold = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();

  return useMutation({
    mutationFn: (payload: CreateHouseholdPayload) =>
      createHousehold({ ...payload, userId: session?.user.id ?? '' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: householdQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: householdMemberQueryKeys.all });
    },
    onError: (error) => {
      Alert.alert(
        '가계부 생성 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });
};
