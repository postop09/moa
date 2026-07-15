import { supabase } from '@/shared/api';
import { getMonthRange } from '../lib/getMonthRange';
import { mapTransaction } from '../lib/mapTransaction';
import type { GetTransactionsReq } from '../model/getTransactionsReq';
import type { Transaction } from '../model/transaction';

export const getTransactions = async ({
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
    })
    .order('transactionDt', { ascending: false });

  if (yearMonth) {
    const { startDate, endDate } = getMonthRange(yearMonth);
    query = query.gte('transactionDt', startDate).lt('transactionDt', endDate);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapTransaction);
};
