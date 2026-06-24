export type HouseholdMember = {
  id: string;
  householdId: string;
  userId: string;
};

export type AddHouseholdMemberInput = {
  householdId: string;
  userId: string;
};
