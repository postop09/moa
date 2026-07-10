import { isSupabaseConfigured } from '@/shared/config';

import { getDemoTransactions } from '../lib/getDemoTransactions';
import { queryTransactions } from '../lib/queryTransactions';
import type { GetTransactionsReq } from '../model/getTransactionsReq';
import type { GetTransactionsRes } from '../model/getTransactionsRes';

export const fetchMonthlyTransactions = async (
  payload: GetTransactionsReq,
): Promise<GetTransactionsRes> => {
  if (!isSupabaseConfigured) {
    return getDemoTransactions(payload.referenceDate ?? new Date());
  }

  return queryTransactions({
    ...payload,
    referenceDate: payload.referenceDate ?? new Date(),
  });
};
