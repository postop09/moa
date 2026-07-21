import { useQuery } from '@tanstack/react-query';

import { getHouseholds } from '@/entities/household';

import { householdQueryKeys } from '../config/queryKeys';

export const useGetHouseholds = (userId: string) => {
  return useQuery({
    queryKey: householdQueryKeys.list(userId),
    queryFn: () => getHouseholds(userId),
    enabled: !!userId,
  });
};
