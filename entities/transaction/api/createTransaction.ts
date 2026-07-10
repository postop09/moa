import { mapTransaction, toTransactionInsertRow } from '../lib/mapTransaction';
import type { CreateTransactionReq } from '../model/createTransactionReq';
import type { Transaction } from '../model/transaction';
import { supabase } from '@/shared/api';

export const createTransaction = async (
  payload: CreateTransactionReq,
): Promise<Transaction> => {
  const { data, error } = await supabase
    .from('transactions')
    .insert(toTransactionInsertRow(payload))
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return mapTransaction(data);
};
