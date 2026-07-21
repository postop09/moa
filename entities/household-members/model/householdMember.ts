export type HouseholdMemberRole = 'owner' | 'member';

export type HouseholdMember = {
  id: number;
  householdId: string;
  userId: string;
  role: HouseholdMemberRole;
  joinedAt: string;
};
