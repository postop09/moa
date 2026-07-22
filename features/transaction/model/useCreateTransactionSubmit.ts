import { useProfileStore } from '@/entities/profiles';
import { useHouseholdStore } from '@/entities/households';

import {
  buildCreateTransactionReq,
  type CreateTransactionInput,
} from '../lib/buildCreateTransactionReq';
import { useCreateTransaction } from './useCreateTransaction';

type SubmitOptions = {
  onSuccess?: () => void;
};

export const useCreateTransactionSubmit = () => {
  const { selectedHouseholdId } = useHouseholdStore();
  const { profile } = useProfileStore();
  const mutation = useCreateTransaction();

  const submit = (payload: CreateTransactionInput, options?: SubmitOptions) => {
    if (!selectedHouseholdId || !profile?.id) {
      return false;
    }

    mutation.mutate(
      buildCreateTransactionReq(payload, {
        householdId: selectedHouseholdId,
        createdBy: profile.id,
      }),
      options,
    );

    return true;
  };

  return {
    submit,
    isPending: mutation.isPending,
  };
};
