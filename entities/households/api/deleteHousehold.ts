import { supabase } from '@/shared/api';

export const deleteHousehold = async (id: string): Promise<void> => {
  const { error } = await supabase.from('households').delete().eq('id', id);

  if (error) {
    throw error;
  }
};
