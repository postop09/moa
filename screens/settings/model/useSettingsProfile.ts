import { useQuery } from '@tanstack/react-query';

import { getProfile, useSession } from '@/entities/auth';

export function useSettingsProfile() {
  const { session } = useSession();

  return useQuery({
    queryKey: ['profile', session?.user.id],
    queryFn: () => getProfile(session?.user.id ?? ''),
    enabled: !!session?.user.id,
  });
}
