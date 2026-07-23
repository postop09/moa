import { supabase } from '@/shared/api';
import { getMonthRange } from '../lib/getMonthRange';
import { getYearRange } from '../lib/getYearRange';
import { mapTransaction } from '../lib/mapTransaction';
import type { GetTransactionsReq } from '../model/getTransactionsReq';
import type { Transaction } from '../model/transaction';

export const getTransactions = async ({
  householdId,
  type,
  categoryId,
  yearMonth,
  year,
}: GetTransactionsReq): Promise<Transaction[]> => {
  let query = supabase
    .from('transactions')
    .select('*, categories(name)')
    .match({
      householdId,
      ...(type && { type }),
      ...(categoryId && { categoryId }),
    })
    .order('transactionDt', { ascending: false });

  if (yearMonth) {
    const { startDate, endDate } = getMonthRange(yearMonth);
    query = query.gte('transactionDt', startDate).lt('transactionDt', endDate);
  } else if (year !== undefined) {
    const { startDate, endDate } = getYearRange(year);
    query = query.gte('transactionDt', startDate).lt('transactionDt', endDate);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapTransaction);
};
