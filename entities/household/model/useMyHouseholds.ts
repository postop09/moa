import { useQuery } from '@tanstack/react-query';

import { useSessionStore } from '@/entities/auth';

import { fetchMyHouseholds } from '../api/households-api';

export const useMyHouseholds = () => {
  const { session } = useSessionStore();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ['households', userId],
    queryFn: () => fetchMyHouseholds(userId!),
    enabled: !!userId,
  });
};
