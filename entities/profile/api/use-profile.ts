import { useQuery } from '@tanstack/react-query';

import { useSession } from '@/entities/session';

import { fetchProfile } from './profiles-api';

export function useProfile() {
  const { session } = useSession();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => fetchProfile(userId!),
    enabled: !!userId,
  });
}
