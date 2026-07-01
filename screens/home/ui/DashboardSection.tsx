import { useDailyExpenses, useMonthlySummary } from '@/entities/transaction';
import { BalanceCard } from '@/widgets/balance-card';
import { ExpenseChart } from '@/widgets/expense-chart';
import { MonthlySummary } from '@/widgets/monthly-summary';
export const DashboardSection = () => {
  const { data: summary, isLoading: summaryLoading } = useMonthlySummary();
  const { data: dailyExpenses, isLoading: chartLoading } = useDailyExpenses();
  return (
    <>
      <BalanceCard balance={summary?.balance ?? 0} isLoading={summaryLoading} />

      <MonthlySummary
        income={summary?.income ?? 0}
        expense={summary?.expense ?? 0}
        isLoading={summaryLoading}
      />

      <ExpenseChart data={dailyExpenses ?? []} isLoading={chartLoading} />
    </>
  );
};
