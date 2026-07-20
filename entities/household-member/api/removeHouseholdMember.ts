import { supabase } from '@/shared/api';
import { isSupabaseConfigured } from '@/shared/config';

import { mockHouseholdMembers } from '../lib/mock-household-members';

export const removeHouseholdMember = async (id: number): Promise<void> => {
  if (!isSupabaseConfigured) {
    const index = mockHouseholdMembers.findIndex((member) => member.id === id);
    if (index !== -1) {
      mockHouseholdMembers.splice(index, 1);
    }
    return;
  }

  const { error } = await supabase
    .from('household-members')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
};
