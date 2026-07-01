import { useQuery } from '@tanstack/react-query';

import { getProfile, useSessionStore } from '@/entities/auth';

export function useSettingsProfile() {
  const { session } = useSessionStore();

  return useQuery({
    queryKey: ['profile', session?.user.id],
    queryFn: () => getProfile(session?.user.id ?? ''),
    enabled: !!session?.user.id,
  });
}
