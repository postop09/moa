import { useMonthlySummary } from '@/entities/transaction';
import { useHouseholdStore } from '@/shared/model';
import { MonthlySummary } from '@/widgets/monthly-summary';

export const SummarySection = () => {
  const { selectedHouseholdId } = useHouseholdStore();
  const { data: summary, isLoading } = useMonthlySummary(
    selectedHouseholdId ?? '',
  );
  return (
    <MonthlySummary
      income={summary?.income ?? 0}
      expense={summary?.expense ?? 0}
      isLoading={isLoading}
    />
  );
};
