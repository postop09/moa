import { useDailyExpenses } from '@/entities/transaction';
import { useHouseholdStore } from '@/shared/model';
import { ExpenseChart } from '@/widgets/expense-chart';

export const TrendSection = () => {
  const { selectedHouseholdId } = useHouseholdStore();
  const { data: dailyExpenses, isLoading } = useDailyExpenses(
    selectedHouseholdId ?? '',
  );
  return (
    <ExpenseChart
      data={dailyExpenses ?? []}
      isLoading={isLoading}
      title="일별 지출 추이"
    />
  );
};
