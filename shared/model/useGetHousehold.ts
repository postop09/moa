import { useQuery } from '@tanstack/react-query';

import { getHouseholds } from '@/entities/household';

export const useGetHousehold = (userId: string) => {
  return useQuery({
    queryKey: ['household', userId],
    queryFn: () => getHouseholds(userId),
    enabled: !!userId,
  });
};
