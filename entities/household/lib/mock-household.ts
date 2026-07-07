import { mockHouseholdMembers } from '@/entities/household-member/lib/mock-household-members';

import type { Household } from '../model/household';

export const mockHouseholds: Household[] = [
  {
    id: 'household-demo',
    name: '우리집',
    ownerId: 'demo',
  },
];

export const getMockHouseholdsByUserId = (userId: string): Household[] => {
  return mockHouseholds.filter((household) => household.ownerId === userId);
};

export const removeMockHousehold = (id: string): void => {
  const index = mockHouseholds.findIndex((household) => household.id === id);
  if (index !== -1) {
    mockHouseholds.splice(index, 1);
  }

  for (let i = mockHouseholdMembers.length - 1; i >= 0; i -= 1) {
    if (mockHouseholdMembers[i].householdId === id) {
      mockHouseholdMembers.splice(i, 1);
    }
  }
};
