import { create } from 'zustand';

type HouseholdState = {
  selectedHouseholdId: string | null;
};

type HouseholdActions = {
  setSelectedHouseholdId: (householdId: string | null) => void;
  clear: () => void;
};

type HouseholdStore = HouseholdState & HouseholdActions;

export const useHouseholdStore = create<HouseholdStore>(() => ({
  selectedHouseholdId: null,

  setSelectedHouseholdId: (householdId) => {
    useHouseholdStore.setState({ selectedHouseholdId: householdId });
  },
  clear: () => {
    useHouseholdStore.setState({ selectedHouseholdId: null });
  },
}));
