import { supabase } from '@/shared';

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  console.log('data', data);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};
