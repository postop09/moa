import { supabase } from '@/shared/api';

import type { LeaveHouseholdReq } from '../model/leaveHouseholdReq';

export const leaveHousehold = async (
  payload: LeaveHouseholdReq,
): Promise<void> => {
  const { data: member, error: fetchError } = await supabase
    .from('household-members')
    .select('id, role')
    .eq('householdId', payload.householdId)
    .eq('userId', payload.userId)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  if (member.role === 'owner') {
    throw new Error(
      '소유자는 가계부를 나갈 수 없습니다. 가계부를 삭제해주세요.',
    );
  }

  const { error } = await supabase
    .from('household-members')
    .delete()
    .eq('id', member.id);

  if (error) {
    throw error;
  }
};
