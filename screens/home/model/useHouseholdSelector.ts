import { useEffect } from 'react';
import {
  useAuthStore,
  useGetHouseholds,
  useHouseholdStore,
} from '@/shared/model';

export const useHouseholdSelector = () => {
  const { session } = useAuthStore();
  const { data: households, isLoading } = useGetHouseholds(
    session?.user.id ?? '',
  );
  const { selectedHouseholdId, setSelectedHouseholdId } = useHouseholdStore();

  useEffect(() => {
    if (!households?.length) {
      return;
    }

    const isValidSelection = households.some(
      (household) => household.id === selectedHouseholdId,
    );

    if (!selectedHouseholdId || !isValidSelection) {
      setSelectedHouseholdId(households[0].id);
    }
  }, [households, selectedHouseholdId, setSelectedHouseholdId]);

  const selectedHousehold = households?.find(
    (household) => household.id === selectedHouseholdId,
  );

  return {
    households: households ?? [],
    selectedHousehold,
    selectedHouseholdId,
    setSelectedHouseholdId,
    isLoading,
  };
};
