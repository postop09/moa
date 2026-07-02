import { useQuery } from '@tanstack/react-query';

import { getProfile } from '@/entities/auth';

export const useGetProfile = (userId: string) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId,
  });
};
