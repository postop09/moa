import type { HouseholdMemberRole } from './householdMember';

export type AddHouseholdMemberReq = {
  householdId: string;
  userId: string;
  role?: HouseholdMemberRole;
};
