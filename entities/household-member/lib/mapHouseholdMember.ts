import type { HouseholdMember } from '../model/householdMember';

export const mapHouseholdMember = (row: HouseholdMember): HouseholdMember => {
  return {
    id: row.id,
    householdId: row.householdId,
    userId: row.userId,
    role: row.role,
    joinedAt: row.joinedAt,
  };
};
