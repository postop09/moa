import { useQuery } from '@tanstack/react-query';

import { TransactionType } from '@/shared/model';
import { getCategories } from '@/entities/category';

export const useGetCategories = (
  householdId: string,
  type?: TransactionType,
) => {
  return useQuery({
    queryKey: ['categories', householdId, type],
    queryFn: () => getCategories({ householdId, type }),
    enabled: !!householdId,
  });
};
