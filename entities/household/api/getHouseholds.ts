import { supabase } from '@/shared/api';
import type { GetHouseholdsRes } from '../model/getHouseholdsRes';

export const getHouseholds = async (
  userId: string,
): Promise<GetHouseholdsRes> => {
  const { data, error } = await supabase
    .from('households')
    .select('id, name')
    .eq('ownerId', userId)
    .order('name', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};
