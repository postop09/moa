import type { HouseholdMember } from './householdMember';

export type GetHouseholdMembersRes = (HouseholdMember & {
  nickname: string;
})[];
