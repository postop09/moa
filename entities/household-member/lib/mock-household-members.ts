import type { HouseholdMember } from '../model/householdMember';

export const mockHouseholdMembers: HouseholdMember[] = [
  {
    id: 1,
    householdId: 'household-demo',
    userId: 'demo',
    role: 'owner',
    joinedAt: '2026-01-01T00:00:00.000Z',
  },
];

let nextMockId = 2;

export const createMockHouseholdMemberId = () => {
  const id = nextMockId;
  nextMockId += 1;
  return id;
};
