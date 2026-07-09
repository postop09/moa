import { normalizeBudget } from '../lib/categoryDefaults';
import type { Category } from '../model/category';
import type { UpdateCategoryReq } from '../model/updateCategoryReq';
import { supabase } from '@/shared/api';

export const updateCategory = async (
  payload: UpdateCategoryReq,
): Promise<Category> => {
  const { data, error } = await supabase
    .from('categories')
    .update({
      ...payload,
      budget: normalizeBudget(payload.budget),
    })
    .eq('id', payload.id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
