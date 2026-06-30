import { useMonthlySummary } from '@/entities/transaction';
import { MonthlySummary } from '@/widgets/monthly-summary';

export function SummarySection() {
  const { data: summary, isLoading } = useMonthlySummary();

  return (
    <MonthlySummary
      income={summary?.income ?? 0}
      expense={summary?.expense ?? 0}
      isLoading={isLoading}
    />
  );
}
