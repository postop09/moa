import { getTransactions } from '@/entities/transaction';
import { useHouseholdStore } from '@/shared/model';
import { useQuery } from '@tanstack/react-query';

export const useGetBalance = () => {
  const { selectedHouseholdId } = useHouseholdStore();
  const now = new Date();
  const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const { data, isLoading } = useQuery({
    queryKey: ['balance', selectedHouseholdId, yearMonth],
    queryFn: () =>
      getTransactions({ householdId: selectedHouseholdId!, yearMonth }),
  });

  let income = 0;
  let expense = 0;
  let balance = 0;

  data?.forEach((transaction) => {
    const amount = transaction.amount ?? 0;
    if (transaction.type === 'income') {
      income += amount;
    } else {
      expense += amount;
    }
  });

  balance = income - expense;

  return { income, expense, balance, isLoading };
};
