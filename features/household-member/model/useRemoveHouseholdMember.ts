import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { removeHouseholdMember } from '@/entities/household-member';

import { householdMemberQueryKeys } from '../config/queryKeys';

export const useRemoveHouseholdMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => removeHouseholdMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: householdMemberQueryKeys.all });
    },
    onError: (error) => {
      Alert.alert(
        '삭제 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });

  const handleRemove = (memberId: number, nickname: string) => {
    Alert.alert('멤버 삭제', `'${nickname}' 님을 삭제할까요?`, [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제하기',
        style: 'destructive',
        onPress: () => mutation.mutate(memberId),
      },
    ]);
  };

  return {
    ...mutation,
    handleRemove,
  };
};
