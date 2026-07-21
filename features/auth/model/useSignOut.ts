import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { signOut, useAuthStore } from '@/entities/auth';
import { useProfileStore } from '@/entities/profiles';
import { useHouseholdStore } from '@/shared/model';

export const useSignOut = () => {
  const { clear } = useAuthStore();
  const { clear: clearProfile } = useProfileStore();
  const { clear: clearHousehold } = useHouseholdStore();

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      clear();
      clearProfile();
      clearHousehold();
    },
    onError: (error) => {
      Alert.alert(
        '로그아웃 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });
};
