import { useQuery } from '@tanstack/react-query';

import { fetchCategories } from './categories-api';
import type { CategoryType } from '../model/types';

export function useCategories(type?: CategoryType) {
  return useQuery({
    queryKey: ['categories', type ?? 'all'],
    queryFn: () => fetchCategories(type),
  });
}
