import { supabase } from '@/shared/api';
import { GetCategoriesRes } from '../model/getCategoriesRes';
import { GetCategoriesReq } from '../model/getCategoriesReq';

export const getCategories = async (
  payload: GetCategoriesReq,
): Promise<GetCategoriesRes> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('householdId', payload.householdId);

  if (error) {
    throw error;
  }

  if (payload.type) {
    return data.filter((category) => category.type === payload.type);
  }

  return data;
};
