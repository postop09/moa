import { supabase } from '@/shared/api';

import type { Profile } from '../model/profile';

export const getProfileByEmail = async (
  email: string,
): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, nickname')
    .ilike('email', email.trim())
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};
