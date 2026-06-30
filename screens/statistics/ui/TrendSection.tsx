import { useDailyExpenses } from '@/entities/transaction';
import { ExpenseChart } from '@/widgets/expense-chart';

export function TrendSection() {
  const { data: dailyExpenses, isLoading } = useDailyExpenses();

  return (
    <ExpenseChart
      data={dailyExpenses ?? []}
      isLoading={isLoading}
      title="일별 지출 추이"
    />
  );
}
