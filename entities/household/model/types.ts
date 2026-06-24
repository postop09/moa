export type Household = {
  id: string;
  name: string;
  ownerId: string;
};

export type CreateHouseholdInput = {
  name: string;
};

export type UpdateHouseholdInput = {
  id: string;
  name: string;
};
