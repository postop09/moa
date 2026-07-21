import { useQuery } from '@tanstack/react-query';

import { getProfile } from '@/entities/profiles';

import { authQueryKeys } from '../config/queryKeys';

export const useGetProfile = (userId: string) => {
  return useQuery({
    queryKey: authQueryKeys.profile(userId),
    queryFn: () => getProfile(userId),
    enabled: !!userId,
  });
};
