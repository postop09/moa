import { useQuery } from '@tanstack/react-query';

import { getHouseholdMembers } from '@/entities/household-member';

import { householdMemberQueryKeys } from '../config/queryKeys';

export const useGetHouseholdMembers = (householdId?: string) => {
  return useQuery({
    queryKey: householdMemberQueryKeys.list(householdId),
    queryFn: () => getHouseholdMembers(householdId!),
    enabled: !!householdId,
  });
};
