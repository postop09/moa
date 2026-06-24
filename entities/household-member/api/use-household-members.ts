import { useQuery } from '@tanstack/react-query';

import { fetchHouseholdMembers } from './household-members-api';

export function useHouseholdMembers(householdId?: string) {
  return useQuery({
    queryKey: ['household-members', householdId],
    queryFn: () => fetchHouseholdMembers(householdId!),
    enabled: !!householdId,
  });
}
