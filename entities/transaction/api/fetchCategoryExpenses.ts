import { isSupabaseConfigured } from '@/shared/config';

import { calculateCategoryExpenses } from '../lib/summary';
import { queryTransactions } from '../lib/queryTransactions';
import { getDemoTransactions } from '../lib/getDemoTransactions';
import type { GetTransactionsReq } from '../model/getTransactionsReq';
import type { CategoryExpense } from '../model/categoryExpense';

export const fetchCategoryExpenses = async (
  payload: GetTransactionsReq,
): Promise<CategoryExpense[]> => {
  const transactions = isSupabaseConfigured
    ? await queryTransactions({
        ...payload,
        referenceDate: payload.referenceDate ?? new Date(),
      })
    : getDemoTransactions(payload.referenceDate ?? new Date());

  return calculateCategoryExpenses(transactions);
};
