import { supabase } from '@/shared/api';
import { Profile } from '../model/profile';

export const createProfile = async (payload: Profile): Promise<Profile> => {
  const { data, error } = await supabase
    .from('profiles')
    .insert(payload)
    .select('id, email, nickname')
    .single();

  if (error) {
    throw error;
  }

  return data;
};
