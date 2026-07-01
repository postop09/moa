import { supabase } from '@/shared/api';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

export const getSessionChange = (
  callback: (event: AuthChangeEvent, session: Session | null) => void,
) => {
  const { data } = supabase.auth.onAuthStateChange(callback);
  const subscription = data.subscription;

  return subscription;
};
