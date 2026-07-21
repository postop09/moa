import { supabase } from '@/shared/api';
import type { GetCategoriesReq } from '../model/getCategoriesReq';
import type { GetCategoriesRes } from '../model/getCategoriesRes';

export const getCategories = async ({
  householdId,
  type,
}: GetCategoriesReq): Promise<GetCategoriesRes> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .match({ householdId, ...(type && { type }) });

  if (error) {
    throw error;
  }

  return data;
};
