import { supabase } from '@/shared/api';
import { isSupabaseConfigured } from '@/shared/config';

import { mapHouseholdMember } from '../lib/mapHouseholdMember';
import {
  createMockHouseholdMemberId,
  mockHouseholdMembers,
} from '../lib/mock-household-members';
import type { AddHouseholdMemberReq } from '../model/addHouseholdMemberReq';
import type { HouseholdMember } from '../model/householdMember';

export const addHouseholdMember = async (
  payload: AddHouseholdMemberReq,
): Promise<HouseholdMember> => {
  const role = payload.role ?? 'member';
  const joinedAt = new Date().toISOString();

  if (!isSupabaseConfigured) {
    const member: HouseholdMember = {
      id: createMockHouseholdMemberId(),
      householdId: payload.householdId,
      userId: payload.userId,
      role,
      joinedAt,
    };
    mockHouseholdMembers.push(member);
    return member;
  }

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

  return mapHouseholdMember(data);
};
