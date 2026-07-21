import { supabase } from '@/shared/api';

import type { GetHouseholdsRes } from '../model/getHouseholdsRes';

export const getHouseholds = async (
  userId: string,
): Promise<GetHouseholdsRes> => {
  const { data, error } = await supabase
    .from('household-members')
    .select('household:households(id, name)')
    .eq('userId', userId)
    .order('joinedAt', { ascending: true });
  const households = data?.map((item) => item.household ?? []).flat();

  if (error) {
    throw error;
  }

  return households as GetHouseholdsRes;
};
