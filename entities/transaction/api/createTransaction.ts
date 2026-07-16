import type { CreateTransactionReq } from '../model/createTransactionReq';
import { toTransactionInsertRow } from '../lib/mapTransaction';
import { supabase } from '@/shared/api';

export const createTransaction = async (payload: CreateTransactionReq) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert(toTransactionInsertRow(payload))
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};
