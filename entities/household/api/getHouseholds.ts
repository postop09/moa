import { supabase } from '@/shared/api';
import type { Household } from '../model/household';

export const getHouseholds = async (userId: string): Promise<Household[]> => {
  const { data, error } = await supabase
    .from('household')
    .select('id, name, ownerId')
    .eq('ownerId', userId)
    .order('name', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};
