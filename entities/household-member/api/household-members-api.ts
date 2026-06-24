import { supabase } from '@/shared/api';
import { isSupabaseConfigured } from '@/shared/config';

import { mockHouseholdMembers } from '../lib/mock-household-members';
import type { AddHouseholdMemberInput, HouseholdMember } from '../model/types';

type HouseholdMemberRow = {
  id: string;
  household_id: string;
  user_id: string;
};

function mapHouseholdMember(row: HouseholdMemberRow): HouseholdMember {
  return {
    id: row.id,
    householdId: row.household_id,
    userId: row.user_id,
  };
}

export async function fetchHouseholdMembers(
  householdId: string,
): Promise<HouseholdMember[]> {
  if (!isSupabaseConfigured) {
    return mockHouseholdMembers.filter(
      (member) => member.householdId === householdId,
    );
  }

  const { data, error } = await supabase
    .from('household_member')
    .select('id, household_id, user_id')
    .eq('household_id', householdId)
    .order('user_id', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) =>
    mapHouseholdMember(row as HouseholdMemberRow),
  );
}

export async function addHouseholdMember(
  input: AddHouseholdMemberInput,
): Promise<HouseholdMember> {
  if (!isSupabaseConfigured) {
    const member: HouseholdMember = {
      id: `member-${Date.now()}`,
      householdId: input.householdId,
      userId: input.userId,
    };

    mockHouseholdMembers.push(member);
    return member;
  }

  const { data, error } = await supabase
    .from('household_member')
    .insert({
      household_id: input.householdId,
      user_id: input.userId,
    })
    .select('id, household_id, user_id')
    .single();

  if (error) {
    throw error;
  }

  return mapHouseholdMember(data as HouseholdMemberRow);
}

export async function removeHouseholdMember(id: string): Promise<void> {
  if (!isSupabaseConfigured) {
    const index = mockHouseholdMembers.findIndex((member) => member.id === id);

    if (index !== -1) {
      mockHouseholdMembers.splice(index, 1);
    }

    return;
  }

  const { error } = await supabase
    .from('household_member')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}
