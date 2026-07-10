import { mapTransaction, toTransactionUpdateRow } from '../lib/mapTransaction';
import type { Transaction } from '../model/transaction';
import type { UpdateTransactionReq } from '../model/updateTransactionReq';
import { supabase } from '@/shared/api';

export const updateTransaction = async (
  payload: UpdateTransactionReq,
): Promise<Transaction> => {
  const { id, ...fields } = payload;

  const { data, error } = await supabase
    .from('transactions')
    .update(toTransactionUpdateRow(fields))
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapTransaction(data);
};
