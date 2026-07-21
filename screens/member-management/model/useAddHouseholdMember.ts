import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';

import { getProfileByEmail } from '@/entities/auth';
import { addHouseholdMember } from '@/entities/household-member';
import { householdMemberQueryKeys } from '@/features/household-member';
import { isSupabaseConfigured } from '@/shared/config';

type AddMemberPayload = {
  householdId: string;
  email: string;
};

export const useAddHouseholdMember = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async ({ householdId, email }: AddMemberPayload) => {
      if (!isSupabaseConfigured) {
        return addHouseholdMember({
          householdId,
          userId: email.trim(),
          role: 'member',
        });
      }

      const profile = await getProfileByEmail(email);
      if (!profile) {
        throw new Error('해당 이메일의 사용자를 찾을 수 없습니다.');
      }

      return addHouseholdMember({
        householdId,
        userId: profile.id,
        role: 'member',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: householdMemberQueryKeys.all });
      setIsAddOpen(false);
    },
    onError: (error) => {
      Alert.alert(
        '추가 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });

  return {
    ...mutate,
    isAddOpen,
    setIsAddOpen,
  };
};
