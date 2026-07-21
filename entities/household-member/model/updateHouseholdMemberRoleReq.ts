import type { HouseholdMemberRole } from './householdMember';

export type UpdateHouseholdMemberRoleReq = {
  id: number;
  role: HouseholdMemberRole;
};
