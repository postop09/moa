import { supabase } from '@/shared/api';

export const createSession = async (code: string) => {
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    throw error;
  }

  return data;
};
