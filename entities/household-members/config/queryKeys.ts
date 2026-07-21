export const householdMemberQueryKeys = {
  all: ['household-members'] as const,
  list: (householdId?: string) => ['household-members', householdId] as const,
};
