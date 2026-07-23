import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from 'react-native';

import type { Transaction } from '@/entities/transactions';
import { Colors } from '@/shared/config';
import { formatCurrency, useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';

import { aggregateDailyExpense } from '../lib/aggregateDailyExpense';

type Props = {
  transactions: Transaction[];
  yearMonth: string;
  isLoading?: boolean;
};

const CHART_HEIGHT = 140;
const TOOLTIP_WIDTH = 120;

export const DailyExpenseChart = ({
  transactions,
  yearMonth,
  isLoading,
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [chartWidth, setChartWidth] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const items = useMemo(
    () => aggregateDailyExpense(transactions, yearMonth),
    [transactions, yearMonth],
  );

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.amount, 0),
    [items],
  );

  const maxValue = useMemo(
    () => Math.max(...items.map((item) => item.amount), 0),
    [items],
  );

  const hasExpense = total > 0;
  const month = Number(yearMonth.split('-')[1]);

  useEffect(() => {
    setSelectedDay(null);
  }, [yearMonth, transactions]);

  const selectedItem =
    selectedDay === null
      ? null
      : (items.find((item) => item.day === selectedDay) ?? null);

  const selectedIndex =
    selectedDay === null
      ? -1
      : items.findIndex((item) => item.day === selectedDay);

  const handleLayout = (event: LayoutChangeEvent) => {
    const nextWidth = Math.floor(event.nativeEvent.layout.width);
    if (nextWidth > 0 && nextWidth !== chartWidth) {
      setChartWidth(nextWidth);
    }
  };

  const handleSelectDay = (day: number, amount: number) => {
    if (amount <= 0) {
      return;
    }
    setSelectedDay((prev) => (prev === day ? null : day));
  };

  const columnWidth = items.length > 0 ? chartWidth / items.length : 0;
  const tooltipLeft =
    selectedIndex >= 0
      ? Math.min(
          Math.max(
            columnWidth * selectedIndex + columnWidth / 2 - TOOLTIP_WIDTH / 2,
            0,
          ),
          Math.max(chartWidth - TOOLTIP_WIDTH, 0),
        )
      : 0;

  const selectedBarHeight =
    selectedItem && maxValue > 0
      ? (selectedItem.amount / maxValue) * CHART_HEIGHT
      : 0;
  const tooltipTop = Math.max(CHART_HEIGHT - selectedBarHeight - 48, 0);

  return (
    <ThemedView
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      lightColor={colors.card}
      darkColor={colors.card}
    >
      <View style={styles.header}>
        <ThemedText style={styles.title}>일별 지출</ThemedText>
      </View>

      {isLoading ? (
        <ActivityIndicator color={colors.tint} style={styles.loader} />
      ) : !hasExpense ? (
        <ThemedText style={styles.empty}>이번 달 지출이 없어요</ThemedText>
      ) : (
        <View style={styles.chart} onLayout={handleLayout}>
          <View style={styles.bars}>
            {[0.25, 0.5, 0.75, 1].map((ratio) => (
              <View
                key={ratio}
                pointerEvents="none"
                style={[
                  styles.guideLine,
                  {
                    bottom: CHART_HEIGHT * ratio,
                    backgroundColor: colors.border,
                  },
                ]}
              />
            ))}
            <View
              pointerEvents="none"
              style={[
                styles.guideLine,
                styles.baseline,
                { backgroundColor: colors.border },
              ]}
            />

            {items.map((item) => {
              const heightRatio = maxValue > 0 ? item.amount / maxValue : 0;
              const barHeight = Math.max(heightRatio * CHART_HEIGHT, 0);
              const isSelected = selectedDay === item.day;
              const canPress = item.amount > 0;

              return (
                <Pressable
                  key={item.day}
                  disabled={!canPress}
                  accessibilityRole={canPress ? 'button' : undefined}
                  accessibilityLabel={
                    canPress ? `${month}월 ${item.day}일 지출` : undefined
                  }
                  onPress={() => handleSelectDay(item.day, item.amount)}
                  style={styles.barColumn}
                >
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          height: barHeight,
                          backgroundColor: colors.expense,
                          opacity: isSelected ? 1 : canPress ? 0.85 : 0.25,
                        },
                      ]}
                    />
                  </View>
                </Pressable>
              );
            })}

            {selectedItem && chartWidth > 0 ? (
              <View
                style={[
                  styles.tooltip,
                  {
                    left: tooltipLeft,
                    top: tooltipTop,
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  },
                ]}
                pointerEvents="none"
              >
                <ThemedText style={styles.tooltipDate}>
                  {month}월 {selectedItem.day}일
                </ThemedText>
                <ThemedText
                  style={[styles.tooltipAmount, { color: colors.expense }]}
                >
                  {formatCurrency(selectedItem.amount)}
                </ThemedText>
              </View>
            ) : null}
          </View>

          <View style={styles.labels}>
            <ThemedText style={styles.dayLabel} numberOfLines={1}>
              {items[0]?.label}
            </ThemedText>
            <ThemedText style={styles.dayLabel} numberOfLines={1}>
              {items[items.length - 1]?.label}
            </ThemedText>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  total: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.8,
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
  chart: {
    width: '100%',
  },
  bars: {
    height: CHART_HEIGHT,
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'relative',
  },
  guideLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    zIndex: 0,
  },
  baseline: {
    bottom: 0,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  barTrack: {
    width: '100%',
    height: CHART_HEIGHT,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  barFill: {
    width: '70%',
    minWidth: 3,
    maxWidth: 12,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  dayLabel: {
    fontSize: 10,
    opacity: 0.55,
    lineHeight: 14,
  },
  tooltip: {
    position: 'absolute',
    width: TOOLTIP_WIDTH,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    gap: 2,
    alignItems: 'center',
    zIndex: 2,
  },
  tooltipDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  tooltipAmount: {
    fontSize: 13,
    fontWeight: '700',
  },
});
