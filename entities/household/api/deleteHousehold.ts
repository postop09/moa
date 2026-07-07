import { supabase } from '@/shared/api';
import { isSupabaseConfigured } from '@/shared/config';

import { removeMockHousehold } from '../lib/mock-household';

export const deleteHousehold = async (id: string): Promise<void> => {
  if (!isSupabaseConfigured) {
    removeMockHousehold(id);
    return;
  }

  const { error: memberError } = await supabase
    .from('household_member')
    .delete()
    .eq('household_id', id);

  if (memberError) {
    throw memberError;
  }

  const { error } = await supabase.from('household').delete().eq('id', id);

  if (error) {
    throw error;
  }
};
