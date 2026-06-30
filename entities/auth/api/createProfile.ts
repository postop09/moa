import { supabase } from '@/shared/api';

import type { CreateProfileReq } from '../model/createProfileReq';
import type { Profile } from '../model/profile';

export const createProfile = async (
  payload: CreateProfileReq,
): Promise<Profile> => {
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
