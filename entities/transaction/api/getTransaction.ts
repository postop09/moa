import { supabase } from '@/shared/api';
import { mapTransaction } from '../lib/mapTransaction';
import type { Transaction } from '../model/transaction';

export const getTransaction = async (id: string): Promise<Transaction> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return mapTransaction(data);
};
