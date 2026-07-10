import { supabase } from '@/shared/api';

import { mapTransaction } from './mapTransaction';
import { resolveDateRange } from './resolveDateRange';
import type { GetTransactionsReq } from '../model/getTransactionsReq';
import type { GetTransactionsRes } from '../model/getTransactionsRes';

export const queryTransactions = async (
  payload: GetTransactionsReq,
): Promise<GetTransactionsRes> => {
  let query = supabase
    .from('transactions')
    .select('*')
    .eq('householdId', payload.householdId);

  if (payload.type) {
    query = query.eq('type', payload.type);
  }

  const { start, end } = resolveDateRange(payload);

  if (start) {
    query = query.gte('transactionDt', start.toISOString());
  }

  if (end) {
    query = query.lte('transactionDt', end.toISOString());
  }

  const { data, error } = await query.order('transactionDt', {
    ascending: false,
  });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapTransaction);
};
