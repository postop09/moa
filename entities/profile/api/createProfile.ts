import { supabase } from '@/shared';
import { CreateProfileReq } from '../model/createProfileReq';

export const createProfile = async (payload: CreateProfileReq) => {
  const { data } = await supabase.from('profiles').insert(payload);

  return data;
};
