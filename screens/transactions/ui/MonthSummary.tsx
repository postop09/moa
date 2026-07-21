import { BalanceSummary } from '@/widgets/balanceCard';

type Props = {
  balance: number;
  income: number;
  expense: number;
  isLoading?: boolean;
};

export const MonthSummary = ({
  balance,
  income,
  expense,
  isLoading,
}: Props) => {
  return (
    <BalanceSummary
      balance={balance}
      income={income}
      expense={expense}
      isLoading={isLoading}
      bordered={false}
    />
  );
};
