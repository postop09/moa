import type { Household } from '../model/household';

type HouseholdRow = {
  id: string;
  name: string;
  ownerId: string;
};

export const mapHousehold = (row: HouseholdRow): Household => {
  return {
    id: row.id,
    name: row.name,
    ownerId: row.ownerId,
  };
};
