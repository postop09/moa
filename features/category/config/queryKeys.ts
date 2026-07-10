export const categoryQueryKeys = {
  all: ['categories'] as const,
  list: (householdId: string, type?: string) =>
    ['categories', householdId, type] as const,
};
