import { useMutation } from '@tanstack/react-query';

import { useSession } from '@/entities/session';

import type { CreateProfileInput } from '../model/types';
import { createProfile } from './profiles-api';

export function useCreateProfile() {
  const { session } = useSession();

  return useMutation({
    mutationFn: (input: CreateProfileInput) => {
      if (!session) {
        throw new Error('로그인이 필요합니다.');
      }

      return createProfile(session, input);
    },
  });
}
