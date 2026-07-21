import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { deleteHousehold } from '@/entities/households';
import { householdMemberQueryKeys } from '@/entities/household-members';
import { useHouseholdStore } from '@/shared/model';

import { householdQueryKeys } from '../config/queryKeys';

export const useDeleteHousehold = () => {
  const queryClient = useQueryClient();
  const { selectedHouseholdId, clear } = useHouseholdStore();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteHousehold(id),
    onSuccess: (_data, id) => {
      if (selectedHouseholdId === id) {
        clear();
      }
      queryClient.invalidateQueries({ queryKey: householdQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: householdMemberQueryKeys.all,
      });
    },
    onError: (error) => {
      Alert.alert(
        '삭제 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });

  const handleDelete = (householdId: string, householdName: string) => {
    Alert.alert(
      '가계부 삭제',
      `'${householdName}' 가계부를 삭제할까요?\n모든 거래와 멤버 정보가 함께 삭제됩니다.`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제하기',
          style: 'destructive',
          onPress: () => mutation.mutate(householdId),
        },
      ],
    );
  };

  return {
    ...mutation,
    handleDelete,
  };
};
