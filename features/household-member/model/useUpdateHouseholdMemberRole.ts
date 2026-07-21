import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import {
  type UpdateHouseholdMemberRoleReq,
  updateHouseholdMemberRole,
} from '@/entities/household-members';

import { householdMemberQueryKeys } from '../config/queryKeys';

export const useUpdateHouseholdMemberRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateHouseholdMemberRoleReq) =>
      updateHouseholdMemberRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: householdMemberQueryKeys.all });
    },
    onError: (error) => {
      Alert.alert(
        '권한 변경 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });
};
