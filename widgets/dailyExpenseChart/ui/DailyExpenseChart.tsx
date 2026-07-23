import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import Svg, { Circle, Line, Polyline } from 'react-native-svg';

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

const CHART_HEIGHT = 160;
const PADDING_TOP = 12;
const PADDING_BOTTOM = 8;
const PADDING_X = 8;
const TOOLTIP_WIDTH = 120;
const HIT_RADIUS = 14;

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
  const plotHeight = CHART_HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  const month = Number(yearMonth.split('-')[1]);

  useEffect(() => {
    setSelectedDay(null);
  }, [yearMonth, transactions]);

  const points = useMemo(() => {
    if (chartWidth <= 0 || items.length === 0) {
      return [];
    }

    const plotWidth = chartWidth - PADDING_X * 2;
    const stepX = items.length > 1 ? plotWidth / (items.length - 1) : 0;

    return items.map((item, index) => {
      const x = PADDING_X + stepX * index;
      const ratio = maxValue > 0 ? item.amount / maxValue : 0;
      const y = PADDING_TOP + plotHeight * (1 - ratio);
      return { x, y, day: item.day, label: item.label, amount: item.amount };
    });
  }, [chartWidth, items, maxValue, plotHeight]);

  const polylinePoints = points
    .map((point) => `${point.x},${point.y}`)
    .join(' ');

  const selectedPoint =
    selectedDay === null
      ? null
      : (points.find((point) => point.day === selectedDay) ?? null);

  const handleLayout = (event: LayoutChangeEvent) => {
    const nextWidth = Math.floor(event.nativeEvent.layout.width);
    if (nextWidth > 0 && nextWidth !== chartWidth) {
      setChartWidth(nextWidth);
    }
  };

  const handleSelectDay = (day: number) => {
    setSelectedDay((prev) => (prev === day ? null : day));
  };

  const tooltipLeft = selectedPoint
    ? Math.min(
        Math.max(selectedPoint.x - TOOLTIP_WIDTH / 2, 0),
        Math.max(chartWidth - TOOLTIP_WIDTH, 0),
      )
    : 0;

  const tooltipTop = selectedPoint ? Math.max(selectedPoint.y - 52, 0) : 0;

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
        {!isLoading && hasExpense ? (
          <ThemedText style={styles.total}>{formatCurrency(total)}</ThemedText>
        ) : null}
      </View>

      {isLoading ? (
        <ActivityIndicator color={colors.tint} style={styles.loader} />
      ) : !hasExpense ? (
        <ThemedText style={styles.empty}>이번 달 지출이 없어요</ThemedText>
      ) : (
        <View style={styles.chart} onLayout={handleLayout}>
          {chartWidth > 0 ? (
            <>
              <View>
                <Svg width={chartWidth} height={CHART_HEIGHT}>
                  {[0.25, 0.5, 0.75, 1].map((ratio) => {
                    const y = PADDING_TOP + plotHeight * (1 - ratio);
                    return (
                      <Line
                        key={ratio}
                        x1={PADDING_X}
                        y1={y}
                        x2={chartWidth - PADDING_X}
                        y2={y}
                        stroke={colors.border}
                        strokeWidth={1}
                      />
                    );
                  })}

                  <Line
                    x1={PADDING_X}
                    y1={PADDING_TOP + plotHeight}
                    x2={chartWidth - PADDING_X}
                    y2={PADDING_TOP + plotHeight}
                    stroke={colors.border}
                    strokeWidth={1}
                  />

                  <Polyline
                    points={polylinePoints}
                    fill="none"
                    stroke={colors.expense}
                    strokeWidth={2.5}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {points.map((point) => {
                    if (point.amount <= 0) {
                      return null;
                    }

                    const isSelected = selectedDay === point.day;

                    return (
                      <Circle
                        key={`point-${point.day}`}
                        cx={point.x}
                        cy={point.y}
                        r={isSelected ? 5 : 3.5}
                        fill={colors.expense}
                      />
                    );
                  })}
                </Svg>

                {points.map((point) => {
                  if (point.amount <= 0) {
                    return null;
                  }

                  return (
                    <Pressable
                      key={`hit-${point.day}`}
                      accessibilityRole="button"
                      accessibilityLabel={`${month}월 ${point.day}일 지출`}
                      onPress={() => handleSelectDay(point.day)}
                      hitSlop={4}
                      style={[
                        styles.hitArea,
                        {
                          left: point.x - HIT_RADIUS,
                          top: point.y - HIT_RADIUS,
                          width: HIT_RADIUS * 2,
                          height: HIT_RADIUS * 2,
                          borderRadius: HIT_RADIUS,
                        },
                      ]}
                    />
                  );
                })}

                {selectedPoint ? (
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
                      {month}월 {selectedPoint.day}일
                    </ThemedText>
                    <ThemedText
                      style={[styles.tooltipAmount, { color: colors.expense }]}
                    >
                      {formatCurrency(selectedPoint.amount)}
                    </ThemedText>
                  </View>
                ) : null}
              </View>

              <View style={styles.labels}>
                <ThemedText style={styles.dayLabel}>
                  {items[0]?.label}
                </ThemedText>
                <ThemedText style={styles.dayLabel}>
                  {items[items.length - 1]?.label}
                </ThemedText>
              </View>
            </>
          ) : null}
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
    minHeight: CHART_HEIGHT + 20,
  },
  hitArea: {
    position: 'absolute',
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
  },
  tooltipDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  tooltipAmount: {
    fontSize: 13,
    fontWeight: '700',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingHorizontal: PADDING_X,
  },
  dayLabel: {
    fontSize: 10,
    opacity: 0.55,
    lineHeight: 14,
  },
});
