import type { QueryClient } from '@tanstack/react-query';

import { transactionQueryKeys } from '../config/queryKeys';

export const invalidateTransactionQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: transactionQueryKeys.all });
  queryClient.invalidateQueries({ queryKey: ['monthly-summary'] });
  queryClient.invalidateQueries({ queryKey: ['daily-expenses'] });
  queryClient.invalidateQueries({ queryKey: ['category-expenses'] });
};
