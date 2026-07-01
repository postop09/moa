import { supabase } from '@/shared/api';

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data;
};
