import { useQuery } from '@tanstack/react-query';

import { useSession } from '@/entities/auth';

import { fetchMyHouseholds } from './households-api';

export function useMyHouseholds() {
  const { session } = useSession();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ['households', userId],
    queryFn: () => fetchMyHouseholds(userId!),
    enabled: !!userId,
  });
}
