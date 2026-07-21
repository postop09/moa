import { createProfile } from '@/entities/auth';
import { useAuthStore } from '@/entities/auth';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const useCreateProfile = () => {
  const { session, setProfile } = useAuthStore();

  return useMutation({
    mutationFn: (nickname: string) =>
      createProfile({
        id: session?.user.id ?? '',
        email: session?.user.email ?? '',
        nickname,
      }),
    onSuccess: (data) => {
      setProfile(data);
    },
    onError: (error) => {
      Alert.alert(
        '프로필 생성 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });
};
