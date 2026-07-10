import { isSupabaseConfigured } from '@/shared/config';

import { calculateMonthlySummary } from '../lib/summary';
import { queryTransactions } from '../lib/queryTransactions';
import { getDemoTransactions } from '../lib/getDemoTransactions';
import type { GetTransactionsReq } from '../model/getTransactionsReq';
import type { MonthlySummary } from '../model/monthlySummary';

export const fetchMonthlySummary = async (
  payload: GetTransactionsReq,
): Promise<MonthlySummary> => {
  const transactions = isSupabaseConfigured
    ? await queryTransactions({
        ...payload,
        referenceDate: payload.referenceDate ?? new Date(),
      })
    : getDemoTransactions(payload.referenceDate ?? new Date());

  return calculateMonthlySummary(transactions);
};
