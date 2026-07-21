import { supabase } from '@/shared/api';
import type { AddHouseholdMemberReq } from '../model/addHouseholdMemberReq';
import type { HouseholdMember } from '../model/householdMember';

export const addHouseholdMember = async (
  payload: AddHouseholdMemberReq,
): Promise<HouseholdMember> => {
  const role = payload.role ?? 'member';
  const joinedAt = new Date().toISOString();

  const { data, error } = await supabase
    .from('household-members')
    .insert({
      householdId: payload.householdId,
      userId: payload.userId,
      role,
      joinedAt,
    })
    .select('id, householdId, userId, role, joinedAt')
    .single();

  if (error) {
    throw error;
  }

  return data;
};
