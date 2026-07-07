import { useQuery } from '@tanstack/react-query';

import { getHouseholds } from '@/entities/household';

export const useGetHouseholds = (userId: string) => {
  return useQuery({
    queryKey: ['households', userId],
    queryFn: () => getHouseholds(userId),
    enabled: !!userId,
  });
};
