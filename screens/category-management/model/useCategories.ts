import { useQuery } from '@tanstack/react-query';

import { TransactionType } from '@/entities/transaction';
import { fetchCategories } from '@/entities/category';

export const useCategories = (type?: TransactionType) => {
  return useQuery({
    queryKey: ['categories', type ?? 'all'],
    queryFn: () => fetchCategories(type),
  });
};
