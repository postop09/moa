import { supabase } from '@/shared/api';

export const removeHouseholdMember = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('household-members')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
};
