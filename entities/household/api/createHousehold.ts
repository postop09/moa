import { addHouseholdMember } from '@/entities/household-member';
import { supabase } from '@/shared/api';
import { isSupabaseConfigured } from '@/shared/config';

import { mapHousehold } from '../lib/mapHousehold';
import { mockHouseholds } from '../lib/mock-household';
import type { CreateHouseholdReq } from '../model/createHouseholdReq';
import type { Household } from '../model/household';

export const createHousehold = async (
  payload: CreateHouseholdReq,
): Promise<Household> => {
  if (!isSupabaseConfigured) {
    const household: Household = {
      id: `household-${Date.now()}`,
      name: payload.name.trim(),
      ownerId: payload.userId,
    };
    mockHouseholds.push(household);
    await addHouseholdMember({
      householdId: household.id,
      userId: payload.userId,
    });
    return household;
  }

  const { data, error } = await supabase
    .from('household')
    .insert({
      name: payload.name.trim(),
      ownerId: payload.userId,
    })
    .select('id, name, ownerId')
    .single();

  if (error) {
    throw error;
  }

  const household = mapHousehold(data);

  const { error: memberError } = await supabase
    .from('household_member')
    .insert({
      household_id: household.id,
      user_id: payload.userId,
    });

  if (memberError) {
    throw memberError;
  }

  return household;
};
