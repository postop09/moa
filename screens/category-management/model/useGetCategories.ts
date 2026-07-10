import { useQuery } from '@tanstack/react-query';

import { TransactionType } from '@/shared/model';
import { getCategories } from '@/entities/category';
import { useMemo } from 'react';

export const useGetCategories = (
  householdId: string,
  type?: TransactionType,
) => {
  const query = useQuery({
    queryKey: ['categories', householdId, type],
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
