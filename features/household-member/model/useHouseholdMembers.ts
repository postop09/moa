import { useQuery } from '@tanstack/react-query';

import { fetchHouseholdMembers } from '@/entities/household-member';

import { householdMemberQueryKeys } from '../config/queryKeys';

export const useHouseholdMembers = (householdId?: string) => {
  return useQuery({
    queryKey: householdMemberQueryKeys.list(householdId),
    queryFn: () => fetchHouseholdMembers(householdId!),
    enabled: !!householdId,
  });
};
