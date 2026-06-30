import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { signInWithGoogle } from '@/entities/auth';

export function useSignInWithGoogle() {
  return useMutation({
    mutationFn: signInWithGoogle,
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : '다시 시도해주세요.';

      if (message !== '로그인이 취소되었습니다.') {
        Alert.alert('로그인 실패', message);
      }
    },
  });
}
