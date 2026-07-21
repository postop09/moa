import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { leaveHousehold } from '@/entities/household-member';
import { useAuthStore, useHouseholdStore } from '@/shared/model';

import { householdMemberQueryKeys } from '../config/queryKeys';

export const useLeaveHousehold = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();
  const { selectedHouseholdId, clear } = useHouseholdStore();

  const mutation = useMutation({
    mutationFn: (householdId: string) =>
      leaveHousehold({
        householdId,
        userId: session?.user.id ?? '',
      }),
    onSuccess: (_data, householdId) => {
      if (selectedHouseholdId === householdId) {
        clear();
      }
      queryClient.invalidateQueries({ queryKey: ['households'] });
      queryClient.invalidateQueries({ queryKey: householdMemberQueryKeys.all });
    },
    onError: (error) => {
      Alert.alert(
        '나가기 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });

  const handleLeave = (householdId: string, householdName: string) => {
    Alert.alert('가계부 나가기', `'${householdName}' 가계부에서 나갈까요?`, [
      { text: '취소', style: 'cancel' },
      {
        text: '나가기',
        style: 'destructive',
        onPress: () => mutation.mutate(householdId),
      },
    ]);
  };

  return {
    ...mutation,
    handleLeave,
  };
};
