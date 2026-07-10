export const transactionQueryKeys = {
  all: ['transactions'] as const,
  detail: (id?: string) => ['transaction', id] as const,
};
