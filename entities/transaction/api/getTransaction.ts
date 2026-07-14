import { supabase } from '@/shared/api';
import { getMonthRange } from '../lib/getMonthRange';
import type { GetTransactionsReq } from '../model/getTransactionsReq';
import { Transaction } from '../model/transaction';

export const getTransaction = async ({
  householdId,
  type,
  categoryId,
  yearMonth,
}: GetTransactionsReq): Promise<Transaction[]> => {
  let query = supabase
    .from('transactions')
    .select('*')
    .match({
      householdId,
      ...(type && { type }),
      ...(categoryId && { categoryId }),
    });

  if (yearMonth) {
    const { startDate, endDate } = getMonthRange(yearMonth);
    query = query.gte('transactionDt', startDate).lt('transactionDt', endDate);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
};
