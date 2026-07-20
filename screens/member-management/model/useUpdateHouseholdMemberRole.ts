import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';

import {
  type HouseholdMemberRole,
  type UpdateHouseholdMemberRoleReq,
  updateHouseholdMemberRole,
} from '@/entities/household-member';
import { householdMemberQueryKeys } from '@/features/household-member';

export const useUpdateHouseholdMemberRole = () => {
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (payload: UpdateHouseholdMemberRoleReq) =>
      updateHouseholdMemberRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: householdMemberQueryKeys.all });
      setIsRoleOpen(false);
      setSelectedMemberId(null);
    },
    onError: (error) => {
      Alert.alert(
        '권한 변경 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });

  const openRoleModal = (memberId: number) => {
    setSelectedMemberId(memberId);
    setIsRoleOpen(true);
  };

  const closeRoleModal = () => {
    setIsRoleOpen(false);
    setSelectedMemberId(null);
  };

  const submitRole = (role: HouseholdMemberRole) => {
    if (selectedMemberId == null) {
      return;
    }
    mutate.mutate({ id: selectedMemberId, role });
  };

  return {
    ...mutate,
    isRoleOpen,
    selectedMemberId,
    openRoleModal,
    closeRoleModal,
    submitRole,
  };
};
