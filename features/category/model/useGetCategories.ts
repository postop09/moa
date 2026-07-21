import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getCategories } from '@/entities/category';
import type { CategoryType } from '@/entities/category';

import { categoryQueryKeys } from '../config/queryKeys';

export const useGetCategories = (householdId: string, type?: CategoryType) => {
  const query = useQuery({
    queryKey: categoryQueryKeys.list(householdId, type),
    queryFn: () => getCategories({ householdId, type }),
    enabled: !!householdId,
  });

  const groupedData = useMemo(() => {
    const categories = query.data ?? [];

    return {
      expense: categories.filter((category) => category.type === 'expense'),
      income: categories.filter((category) => category.type === 'income'),
    };
  }, [query.data]);

  return {
    ...query,
    categories: groupedData,
  };
};
