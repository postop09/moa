import { addHouseholdMember } from '@/entities/household-member';
import { supabase } from '@/shared/api';
import { isSupabaseConfigured } from '@/shared/config';
import { mockHouseholds } from '../lib/mock-household';
import type {
  CreateHouseholdInput,
  Household,
  UpdateHouseholdInput,
} from '../model/types';
type HouseholdRow = {
  id: string;
  name: string;
  owner_id: string;
};
const mapHousehold = (row: HouseholdRow): Household => {
  return {
    id: row.id,
    name: row.name,
    ownerId: row.owner_id,
  };
};
const getMockHouseholds = (userId: string): Household[] => {
  return mockHouseholds.filter((household) => household.ownerId === userId);
};
export const fetchMyHouseholds = async (
  userId: string,
): Promise<Household[]> => {
  if (!isSupabaseConfigured) {
    return getMockHouseholds(userId);
  }
  const { data: memberships, error: memberError } = await supabase
    .from('household_member')
    .select('household_id')
    .eq('user_id', userId);
  if (memberError) {
    throw memberError;
  }
  const memberHouseholdIds = (memberships ?? []).map(
    (row) => row.household_id as string,
  );
  let query = supabase
    .from('household')
    .select('id, name, owner_id')
    .order('name', { ascending: true });
  if (memberHouseholdIds.length > 0) {
    query = query.or(
      `owner_id.eq.${userId},id.in.(${memberHouseholdIds.join(',')})`,
    );
  } else {
    query = query.eq('owner_id', userId);
  }
  const { data, error } = await query;
  if (error) {
    throw error;
  }
  return (data ?? []).map((row) => mapHousehold(row as HouseholdRow));
};
export const createHousehold = async (
  userId: string,
  input: CreateHouseholdInput,
): Promise<Household> => {
  if (!isSupabaseConfigured) {
    const household: Household = {
      id: `household-${Date.now()}`,
      name: input.name.trim(),
      ownerId: userId,
    };
    mockHouseholds.push(household);
    await addHouseholdMember({
      householdId: household.id,
      userId,
    });
    return household;
  }
  const { data, error } = await supabase
    .from('household')
    .insert({
      name: input.name.trim(),
      owner_id: userId,
    })
    .select('id, name, owner_id')
    .single();
  if (error) {
    throw error;
  }
  const household = mapHousehold(data as HouseholdRow);
  const { error: memberError } = await supabase
    .from('household_member')
    .insert({
      household_id: household.id,
      user_id: userId,
    });
  if (memberError) {
    throw memberError;
  }
  return household;
};
export const updateHousehold = async (
  input: UpdateHouseholdInput,
): Promise<Household> => {
  if (!isSupabaseConfigured) {
    const index = mockHouseholds.findIndex(
      (household) => household.id === input.id,
    );
    if (index === -1) {
      throw new Error('가구를 찾을 수 없습니다.');
    }
    const updated: Household = {
      ...mockHouseholds[index],
      name: input.name.trim(),
    };
    mockHouseholds[index] = updated;
    return updated;
  }
  const { data, error } = await supabase
    .from('household')
    .update({ name: input.name.trim() })
    .eq('id', input.id)
    .select('id, name, owner_id')
    .single();
  if (error) {
    throw error;
  }
  return mapHousehold(data as HouseholdRow);
};
