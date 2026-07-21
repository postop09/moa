import type { GetTransactionsReq } from '@/entities/transaction';

export const transactionQueryKeys = {
  all: ['transactions'] as const,
  list: (payload?: GetTransactionsReq) => ['transactions', payload] as const,
  detail: (id?: string) => ['transaction', id] as const,
};
