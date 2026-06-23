import { useQuery } from '@tanstack/react-query';

import type { TransactionType } from '@/entities/transaction';

import { fetchCategories } from './categories-api';

export function useCategories(type?: TransactionType) {
  return useQuery({
    queryKey: ['categories', type ?? 'all'],
    queryFn: () => fetchCategories(type),
  });
}
