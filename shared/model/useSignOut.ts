import { signOut } from '@/entities/auth';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const useSignOut = () => {
  return useMutation({
    mutationFn: () => signOut(),
    onError: (error) => {
      Alert.alert(
        '로그아웃 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });
};
