import { isSupabaseConfigured } from '@/shared/config';

import { calculateDailyExpenses } from '../lib/summary';
import { queryTransactions } from '../lib/queryTransactions';
import { getDemoTransactions } from '../lib/getDemoTransactions';
import type { GetTransactionsReq } from '../model/getTransactionsReq';
import type { DailyExpense } from '../model/dailyExpense';

export const fetchDailyExpenses = async (
  payload: GetTransactionsReq,
): Promise<DailyExpense[]> => {
  const transactions = isSupabaseConfigured
    ? await queryTransactions({
        ...payload,
        referenceDate: payload.referenceDate ?? new Date(),
      })
    : getDemoTransactions(payload.referenceDate ?? new Date());

  return calculateDailyExpenses(transactions);
};
