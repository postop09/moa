import { normalizeBudget } from '../lib/normalizeBudget';
import type { CreateCategoryReq } from '../model/createCategoryReq';
import { supabase } from '@/shared/api';

export const createCategory = async (payload: CreateCategoryReq) => {
  const { data, error } = await supabase.from('categories').insert({
    ...payload,
    budget: normalizeBudget(payload.budget),
  });

  if (error) {
    throw error;
  }

  return data;
};
