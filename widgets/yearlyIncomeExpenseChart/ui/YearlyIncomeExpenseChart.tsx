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

import { aggregateMonthlyIncomeExpense } from '../lib/aggregateMonthlyIncomeExpense';

type Props = {
  transactions: Transaction[];
  year: number;
  isLoading?: boolean;
};

type SeriesKey = 'income' | 'expense';

type ChartPoint = {
  month: number;
  label: string;
  x: number;
  incomeY: number;
  expenseY: number;
  income: number;
  expense: number;
};

const CHART_HEIGHT = 180;
const PADDING_TOP = 16;
const PADDING_BOTTOM = 8;
const PADDING_X = 8;
const TOOLTIP_WIDTH = 132;
const HIT_RADIUS = 14;

export const YearlyIncomeExpenseChart = ({
  transactions,
  year,
  isLoading,
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [chartWidth, setChartWidth] = useState(0);
  const [selected, setSelected] = useState<{
    month: number;
    series: SeriesKey;
  } | null>(null);

  const items = useMemo(
    () => aggregateMonthlyIncomeExpense(transactions, year),
    [transactions, year],
  );

  const totals = useMemo(
    () =>
      items.reduce(
        (acc, item) => ({
          income: acc.income + item.income,
          expense: acc.expense + item.expense,
        }),
        { income: 0, expense: 0 },
      ),
    [items],
  );

  const maxValue = useMemo(
    () => Math.max(...items.flatMap((item) => [item.income, item.expense]), 0),
    [items],
  );

  const hasData = totals.income > 0 || totals.expense > 0;
  const plotHeight = CHART_HEIGHT - PADDING_TOP - PADDING_BOTTOM;

  useEffect(() => {
    setSelected(null);
  }, [year, transactions]);

  const points = useMemo<ChartPoint[]>(() => {
    if (chartWidth <= 0 || items.length === 0) {
      return [];
    }

    const plotWidth = chartWidth - PADDING_X * 2;
    const stepX = items.length > 1 ? plotWidth / (items.length - 1) : 0;

    return items.map((item, index) => {
      const x = PADDING_X + stepX * index;
      const incomeRatio = maxValue > 0 ? item.income / maxValue : 0;
      const expenseRatio = maxValue > 0 ? item.expense / maxValue : 0;

      return {
        month: item.month,
        label: item.label,
        x,
        incomeY: PADDING_TOP + plotHeight * (1 - incomeRatio),
        expenseY: PADDING_TOP + plotHeight * (1 - expenseRatio),
        income: item.income,
        expense: item.expense,
      };
    });
  }, [chartWidth, items, maxValue, plotHeight]);

  const incomeLine = points
    .map((point) => `${point.x},${point.incomeY}`)
    .join(' ');
  const expenseLine = points
    .map((point) => `${point.x},${point.expenseY}`)
    .join(' ');

  const selectedPoint =
    selected === null
      ? null
      : (points.find((point) => point.month === selected.month) ?? null);

  const selectedAmount =
    selectedPoint && selected
      ? selected.series === 'income'
        ? selectedPoint.income
        : selectedPoint.expense
      : 0;

  const selectedY =
    selectedPoint && selected
      ? selected.series === 'income'
        ? selectedPoint.incomeY
        : selectedPoint.expenseY
      : 0;

  const handleLayout = (event: LayoutChangeEvent) => {
    const nextWidth = Math.floor(event.nativeEvent.layout.width);
    if (nextWidth > 0 && nextWidth !== chartWidth) {
      setChartWidth(nextWidth);
    }
  };

  const handleSelect = (month: number, series: SeriesKey) => {
    setSelected((prev) =>
      prev?.month === month && prev.series === series
        ? null
        : { month, series },
    );
  };

  const tooltipLeft = selectedPoint
    ? Math.min(
        Math.max(selectedPoint.x - TOOLTIP_WIDTH / 2, 0),
        Math.max(chartWidth - TOOLTIP_WIDTH, 0),
      )
    : 0;

  const tooltipTop = Math.max(selectedY - 56, 0);

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
        <ThemedText style={styles.title}>{year}년 수입·지출</ThemedText>
      </View>
      {isLoading ? (
        <ActivityIndicator color={colors.tint} style={styles.loader} />
      ) : !hasData ? (
        <ThemedText style={styles.empty}>이번 해 거래가 없어요</ThemedText>
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
                    points={incomeLine}
                    fill="none"
                    stroke={colors.income}
                    strokeWidth={2.5}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <Polyline
                    points={expenseLine}
                    fill="none"
                    stroke={colors.expense}
                    strokeWidth={2.5}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {points.map((point) => (
                    <Circle
                      key={`income-dot-${point.month}`}
                      cx={point.x}
                      cy={point.incomeY}
                      r={
                        selected?.month === point.month &&
                        selected.series === 'income'
                          ? 5
                          : point.income > 0
                            ? 3.5
                            : 0
                      }
                      fill={colors.income}
                    />
                  ))}
                  {points.map((point) => (
                    <Circle
                      key={`expense-dot-${point.month}`}
                      cx={point.x}
                      cy={point.expenseY}
                      r={
                        selected?.month === point.month &&
                        selected.series === 'expense'
                          ? 5
                          : point.expense > 0
                            ? 3.5
                            : 0
                      }
                      fill={colors.expense}
                    />
                  ))}
                </Svg>

                {points.map((point) =>
                  point.income > 0 ? (
                    <Pressable
                      key={`income-hit-${point.month}`}
                      accessibilityRole="button"
                      accessibilityLabel={`${point.month}월 수입`}
                      onPress={() => handleSelect(point.month, 'income')}
                      hitSlop={4}
                      style={[
                        styles.hitArea,
                        {
                          left: point.x - HIT_RADIUS,
                          top: point.incomeY - HIT_RADIUS,
                          width: HIT_RADIUS * 2,
                          height: HIT_RADIUS * 2,
                          borderRadius: HIT_RADIUS,
                        },
                      ]}
                    />
                  ) : null,
                )}
                {points.map((point) =>
                  point.expense > 0 ? (
                    <Pressable
                      key={`expense-hit-${point.month}`}
                      accessibilityRole="button"
                      accessibilityLabel={`${point.month}월 지출`}
                      onPress={() => handleSelect(point.month, 'expense')}
                      hitSlop={4}
                      style={[
                        styles.hitArea,
                        {
                          left: point.x - HIT_RADIUS,
                          top: point.expenseY - HIT_RADIUS,
                          width: HIT_RADIUS * 2,
                          height: HIT_RADIUS * 2,
                          borderRadius: HIT_RADIUS,
                        },
                      ]}
                    />
                  ) : null,
                )}

                {selectedPoint && selected ? (
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
                      {year}년 {selectedPoint.month}월 ·{' '}
                      {selected.series === 'income' ? '수입' : '지출'}
                    </ThemedText>
                    <ThemedText
                      style={[
                        styles.tooltipAmount,
                        {
                          color:
                            selected.series === 'income'
                              ? colors.income
                              : colors.expense,
                        },
                      ]}
                    >
                      {formatCurrency(selectedAmount)}
                    </ThemedText>
                  </View>
                ) : null}
              </View>

              <View style={styles.labels}>
                {items.map((item) => (
                  <View key={item.month} style={styles.labelColumn}>
                    <ThemedText style={styles.monthLabel}>
                      {item.label}
                    </ThemedText>
                  </View>
                ))}
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
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  legend: {
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  swatch: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 13,
    opacity: 0.7,
  },
  legendAmount: {
    marginLeft: 'auto',
    fontSize: 13,
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
    fontSize: 11,
    opacity: 0.7,
    textAlign: 'center',
  },
  tooltipAmount: {
    fontSize: 13,
    fontWeight: '700',
  },
  labels: {
    flexDirection: 'row',
    marginTop: 4,
    paddingHorizontal: PADDING_X,
  },
  labelColumn: {
    flex: 1,
    alignItems: 'center',
  },
  monthLabel: {
    fontSize: 10,
    opacity: 0.55,
    lineHeight: 14,
  },
});
