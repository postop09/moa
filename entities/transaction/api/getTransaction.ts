import { supabase } from '@/shared/api';

export const getTransaction = async (id: string) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('householdId', id);

  if (error) {
    throw error;
  }

  return data;
};
