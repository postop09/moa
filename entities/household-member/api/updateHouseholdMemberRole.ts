import { supabase } from '@/shared/api';
import { isSupabaseConfigured } from '@/shared/config';

import { mapHouseholdMember } from '../lib/mapHouseholdMember';
import { mockHouseholdMembers } from '../lib/mock-household-members';
import type { HouseholdMember } from '../model/householdMember';
import type { UpdateHouseholdMemberRoleReq } from '../model/updateHouseholdMemberRoleReq';

export const updateHouseholdMemberRole = async (
  payload: UpdateHouseholdMemberRoleReq,
): Promise<HouseholdMember> => {
  if (!isSupabaseConfigured) {
    const member = mockHouseholdMembers.find((item) => item.id === payload.id);
    if (!member) {
      throw new Error('멤버를 찾을 수 없습니다.');
    }
    member.role = payload.role;
    return { ...member };
  }

  const { data, error } = await supabase
    .from('household-members')
    .update({ role: payload.role })
    .eq('id', payload.id)
    .select('id, householdId, userId, role, joinedAt')
    .single();

  if (error) {
    throw error;
  }

  return mapHouseholdMember(data);
};
