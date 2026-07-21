import { supabase } from '@/shared/api';

export const deleteCategory = async (id: number) => {
  const { data, error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return data;
};
