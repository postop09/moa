import { getTransaction } from '@/entities/transaction';
import { useHouseholdStore } from '@/shared/model';
import { useQuery } from '@tanstack/react-query';

export const useGetBalance = () => {
  const { selectedHouseholdId } = useHouseholdStore();
  const now = new Date();
  const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const { data, isLoading } = useQuery({
    queryKey: ['balance', selectedHouseholdId, yearMonth],
    queryFn: () =>
      getTransaction({ householdId: selectedHouseholdId!, yearMonth }),
  });

  let income = 0;
  let expense = 0;
  let balance = 0;

  data?.forEach((transaction) => {
    if (transaction.type === 'income') {
      income += transaction?.amount ?? 0;
    } else {
      expense += transaction?.amount ?? 0;
    }
  });

  balance = income - expense;

  return { income, expense, balance, isLoading };
};
