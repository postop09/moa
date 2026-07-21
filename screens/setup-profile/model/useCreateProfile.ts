import { useAuthStore } from '@/entities/auth';
import { createProfile, useProfileStore } from '@/entities/profiles';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const useCreateProfile = () => {
  const { session } = useAuthStore();
  const { setProfile } = useProfileStore();

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
