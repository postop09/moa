export const householdQueryKeys = {
  all: ['households'] as const,
  list: (userId: string) => ['households', userId] as const,
};
