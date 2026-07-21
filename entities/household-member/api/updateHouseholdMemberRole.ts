import { supabase } from '@/shared/api';
import type { HouseholdMember } from '../model/householdMember';
import type { UpdateHouseholdMemberRoleReq } from '../model/updateHouseholdMemberRoleReq';

export const updateHouseholdMemberRole = async (
  payload: UpdateHouseholdMemberRoleReq,
): Promise<HouseholdMember> => {
  const { data, error } = await supabase
    .from('household-members')
    .update({ role: payload.role })
    .eq('id', payload.id)
    .select('id, householdId, userId, role, joinedAt')
    .single();

  if (error) {
    throw error;
  }

  return data;
};
