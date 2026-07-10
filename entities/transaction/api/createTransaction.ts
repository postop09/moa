import type { CreateTransactionReq } from '../model/createTransactionReq';
import { supabase } from '@/shared/api';

export const createTransaction = async (payload: CreateTransactionReq) => {
  const { data, error } = await supabase.from('transactions').insert(payload);

  if (error) {
    throw error;
  }

  return data;
};
