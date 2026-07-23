import { useMemo } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import type { Transaction } from '@/entities/transactions';
import { Colors } from '@/shared/config';
import { formatCurrency, useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';

import { aggregateCategorySpending } from '../lib/aggregateCategorySpending';
import { CHART_COLORS } from '../lib/chartColors';

type Props = {
  transactions: Transaction[];
  isLoading?: boolean;
};

export const CategorySpendingDonut = ({ transactions, isLoading }: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { width } = useWindowDimensions();
  const chartSize = Math.min(width - 80, 220);

  const items = useMemo(
    () => aggregateCategorySpending(transactions),
    [transactions],
  );

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.amount, 0),
    [items],
  );

  const pieData = useMemo(
    () =>
      items.map((item, index) => ({
        value: item.amount,
        color: CHART_COLORS[index % CHART_COLORS.length],
        text: item.categoryName,
      })),
    [items],
  );

  return (
    <ThemedView
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      lightColor={colors.card}
      darkColor={colors.card}
    >
      <ThemedText style={styles.title}>카테고리별 지출</ThemedText>

      {isLoading ? (
        <ActivityIndicator color={colors.tint} style={styles.loader} />
      ) : items.length === 0 ? (
        <ThemedText style={styles.empty}>이번 달 지출이 없어요</ThemedText>
      ) : (
        <View style={styles.body}>
          <View style={styles.chartWrap}>
            <PieChart
              data={pieData}
              donut
              radius={chartSize / 2}
              innerRadius={chartSize / 2 - 28}
              innerCircleColor={colors.card}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <ThemedText style={styles.centerCaption}>합계</ThemedText>
                  <ThemedText
                    style={styles.centerAmount}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {formatCurrency(total)}
                  </ThemedText>
                </View>
              )}
            />
          </View>

          <View style={styles.legend}>
            {items.map((item, index) => {
              const ratio =
                total > 0 ? Math.round((item.amount / total) * 100) : 0;

              return (
                <View
                  key={`${item.categoryId}-${item.categoryName}`}
                  style={styles.legendRow}
                >
                  <View
                    style={[
                      styles.swatch,
                      {
                        backgroundColor:
                          CHART_COLORS[index % CHART_COLORS.length],
                      },
                    ]}
                  />
                  <ThemedText style={styles.legendName} numberOfLines={1}>
                    {item.categoryName}
                  </ThemedText>
                  <ThemedText style={styles.legendRatio}>{ratio}%</ThemedText>
                  <ThemedText style={styles.legendAmount}>
                    {formatCurrency(item.amount)}
                  </ThemedText>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  loader: {
    marginVertical: 40,
  },
  empty: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
    paddingVertical: 32,
  },
  body: {
    gap: 16,
    alignItems: 'center',
  },
  chartWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLabel: {
    alignItems: 'center',
    maxWidth: 100,
  },
  centerCaption: {
    fontSize: 12,
    opacity: 0.6,
  },
  centerAmount: {
    fontSize: 13,
    fontWeight: '700',
  },
  legend: {
    width: '100%',
    gap: 10,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  swatch: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendName: {
    flex: 1,
    fontSize: 14,
  },
  legendRatio: {
    fontSize: 13,
    opacity: 0.6,
    minWidth: 36,
    textAlign: 'right',
  },
  legendAmount: {
    fontSize: 13,
    fontWeight: '600',
    minWidth: 80,
    textAlign: 'right',
  },
});
