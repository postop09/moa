import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import type { DailyExpense } from '@/entities/transaction';
import { formatCompactCurrency } from '@/entities/transaction';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
type ExpenseChartProps = {
  data: DailyExpense[];
  isLoading?: boolean;
  title?: string;
};
export const ExpenseChart = ({
  data,
  isLoading,
  title = '주간 지출',
}: ExpenseChartProps) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const chartData = data.map((item) => ({
    value: item.value,
    label: item.label,
    frontColor: colors.expense,
  }));
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  return (
    <ThemedView
      style={[styles.card, { borderColor: colors.border }]}
      lightColor={colors.card}
      darkColor={colors.card}
    >
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>

      {isLoading ? (
        <ActivityIndicator color={colors.expense} style={styles.loader} />
      ) : (
        <View style={styles.chartContainer}>
          <BarChart
            data={chartData}
            barWidth={28}
            spacing={16}
            roundedTop
            roundedBottom
            hideRules
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: colors.icon, fontSize: 11 }}
            xAxisLabelTextStyle={{ color: colors.icon, fontSize: 12 }}
            noOfSections={4}
            maxValue={maxValue * 1.2}
            isAnimated
            animationDuration={600}
            yAxisLabelWidth={48}
            formatYLabel={(value) => {
              const num = Number(value);
              if (num >= 10000) return `${Math.round(num / 10000)}만`;
              if (num >= 1000) return `${Math.round(num / 1000)}천`;
              return String(num);
            }}
          />
        </View>
      )}

      {!isLoading && data.every((d) => d.value === 0) && (
        <ThemedText style={styles.empty}>이번 주 지출 내역이 없어요</ThemedText>
      )}

      {!isLoading && data.some((d) => d.value > 0) && (
        <ThemedText style={styles.total}>
          합계{' '}
          {formatCompactCurrency(data.reduce((sum, d) => sum + d.value, 0))}
        </ThemedText>
      )}
    </ThemedView>
  );
};
const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 18,
  },
  chartContainer: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  loader: {
    marginVertical: 40,
  },
  empty: {
    textAlign: 'center',
    opacity: 0.6,
    fontSize: 14,
  },
  total: {
    textAlign: 'right',
    fontSize: 14,
    opacity: 0.7,
  },
});
