import { signOut } from '@/entities/auth';
import { useAuthStore } from './authStore';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { useHouseholdStore } from './householdStore';

export const useSignOut = () => {
  const { clear } = useAuthStore();
  const { clear: clearHousehold } = useHouseholdStore();

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      clear();
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
