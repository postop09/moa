import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { createProfile, signOut, useSessionStore } from '@/entities/auth';

export const useCreateProfile = () => {
  const { session } = useSessionStore();

  return useMutation({
    mutationFn: (nickname: string) =>
      createProfile({
        id: session?.user.id ?? '',
        email: session?.user.email ?? '',
        nickname,
      }),
    onError: (error) => {
      Alert.alert(
        '프로필 생성 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });
};

export const signOutFromSetup = async () => {
  try {
    await signOut();
  } catch (error) {
    Alert.alert(
      '로그아웃 실패',
      error instanceof Error ? error.message : '다시 시도해주세요.',
    );
  }
};
