import { useQuery } from '@tanstack/react-query';

import { fetchCategories } from '../api/fetchCategories';
import type { CategoryType } from './categoryType';

export const useCategories = (type?: CategoryType) => {
  return useQuery({
    queryKey: ['categories', type ?? 'all'],
    queryFn: () => fetchCategories(type),
  });
};
