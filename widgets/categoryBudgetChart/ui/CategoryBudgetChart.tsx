import { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import type { Category } from '@/entities/categories';
import type { Transaction } from '@/entities/transactions';
import { Colors } from '@/shared/config';
import { formatCurrency, useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';

import { buildCategoryBudgetItems } from '../lib/buildCategoryBudgetItems';

type Props = {
  categories: Category[];
  transactions: Transaction[];
  isLoading?: boolean;
};

export const CategoryBudgetChart = ({
  categories,
  transactions,
  isLoading,
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const items = useMemo(
    () => buildCategoryBudgetItems(categories, transactions),
    [categories, transactions],
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
      <ThemedText style={styles.title}>카테고리 예산 대비 지출</ThemedText>

      {isLoading ? (
        <ActivityIndicator color={colors.tint} style={styles.loader} />
      ) : items.length === 0 ? (
        <ThemedText style={styles.empty}>
          예산이 설정된 카테고리나 지출이 없어요
        </ThemedText>
      ) : (
        <View style={styles.list}>
          {items.map((item) => {
            const hasBudget = item.budget > 0;
            const ratio = hasBudget ? item.spent / item.budget : 0;
            const progress = hasBudget ? Math.min(ratio, 1) : 0;
            const percent = hasBudget ? Math.round(ratio * 100) : null;
            const isOver = hasBudget && ratio >= 1;

            return (
              <View key={item.categoryId} style={styles.row}>
                <View style={styles.rowHeader}>
                  <ThemedText style={styles.name} numberOfLines={1}>
                    {item.categoryName}
                  </ThemedText>
                  {percent !== null ? (
                    <ThemedText
                      style={[
                        styles.percent,
                        isOver && { color: colors.expense },
                      ]}
                    >
                      {percent}%
                    </ThemedText>
                  ) : (
                    <ThemedText style={styles.percentMuted}>
                      예산 없음
                    </ThemedText>
                  )}
                </View>

                <View
                  style={[styles.track, { backgroundColor: colors.border }]}
                >
                  {hasBudget ? (
                    <View
                      style={[
                        styles.fill,
                        {
                          width: `${Math.max(progress * 100, progress > 0 ? 2 : 0)}%`,
                          backgroundColor: isOver
                            ? colors.expense
                            : colors.accent,
                        },
                      ]}
                    />
                  ) : null}
                </View>

                <ThemedText style={styles.amounts}>
                  {formatCurrency(item.spent)}
                  {hasBudget
                    ? ` / ${formatCurrency(item.budget)}`
                    : ' / 예산 없음'}
                </ThemedText>
              </View>
            );
          })}
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
  list: {
    gap: 16,
  },
  row: {
    gap: 8,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  percent: {
    fontSize: 13,
    fontWeight: '600',
  },
  percentMuted: {
    fontSize: 12,
    opacity: 0.55,
  },
  track: {
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
  amounts: {
    fontSize: 12,
    opacity: 0.65,
  },
});
