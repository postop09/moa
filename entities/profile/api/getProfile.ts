import { supabase } from '@/shared/api';
import type { GetProfileRes } from '../model/getProfileRes';

export const getProfile = async (
  userId: string,
): Promise<GetProfileRes | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, nickname')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};
