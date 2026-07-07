import { supabase } from '@/shared/api';
import type { CreateHouseholdReq } from '../model/createHouseholdReq';
import type { Household } from '../model/household';

export const createHousehold = async (
  payload: CreateHouseholdReq,
): Promise<Household> => {
  const { data, error } = await supabase
    .from('households')
    .insert({
      name: payload.name.trim(),
      ownerId: payload.userId,
    })
    .select('id, name, ownerId')
    .single();

  if (error) {
    throw error;
  }

  return data;
};
