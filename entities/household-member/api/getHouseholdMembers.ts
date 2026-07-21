import { supabase } from '@/shared/api';
import type { GetHouseholdMembersRes } from '../model/getHouseholdMembersRes';

export const getHouseholdMembers = async (
  householdId: string,
): Promise<GetHouseholdMembersRes> => {
  const { data, error } = await supabase
    .from('household-members')
    .select('id, householdId, userId, role, joinedAt')
    .eq('householdId', householdId)
    .order('joinedAt', { ascending: true });

  if (error) {
    throw error;
  }

  const members = data ?? [];
  const userIds = members.map((member) => member.userId);

  if (userIds.length === 0) {
    return [];
  }

  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, nickname')
    .in('id', userIds);

  if (profilesError) {
    throw profilesError;
  }

  const nicknameByUserId = new Map(
    (profiles ?? []).map((profile) => [profile.id, profile.nickname]),
  );

  return members.map((member) => ({
    ...member,
    nickname: nicknameByUserId.get(member.userId) ?? '알 수 없음',
  }));
};
