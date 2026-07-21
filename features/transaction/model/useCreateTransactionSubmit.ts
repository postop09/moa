import { useAuthStore } from '@/entities/auth';
import { useHouseholdStore } from '@/shared/model';

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
  const { profile } = useAuthStore();
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
