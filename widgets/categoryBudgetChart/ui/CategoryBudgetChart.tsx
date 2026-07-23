import { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import type { Category } from '@/entities/categories';
import type { Transaction } from '@/entities/transactions';
import { Colors } from '@/shared/config';
import { formatCurrency, useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';

import {
  buildCategoryBudgetItems,
  type CategoryBudgetItem,
} from '../lib/buildCategoryBudgetItems';

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
    <View style={styles.section}>
      <ThemedText style={styles.title}>카테고리 예산 대비 지출</ThemedText>

      {isLoading ? (
        <ThemedView
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
          lightColor={colors.card}
          darkColor={colors.card}
        >
          <ActivityIndicator color={colors.tint} style={styles.loader} />
        </ThemedView>
      ) : items.length === 0 ? (
        <ThemedView
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
          lightColor={colors.card}
          darkColor={colors.card}
        >
          <ThemedText style={styles.empty}>
            예산이 설정된 카테고리나 지출이 없어요
          </ThemedText>
        </ThemedView>
      ) : (
        <View style={styles.list}>
          {items.map((item) => (
            <CategoryBudgetCard key={item.categoryId} item={item} />
          ))}
        </View>
      )}
    </View>
  );
};

type CardProps = {
  item: CategoryBudgetItem;
};

const CategoryBudgetCard = ({ item }: CardProps) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const hasBudget = item.budget > 0;
  const ratio = hasBudget ? item.spent / item.budget : 0;
  const progress = hasBudget ? Math.min(ratio, 1) : 0;
  const percent = hasBudget ? Math.round(ratio * 100) : null;
  const isOver = hasBudget && ratio >= 1;

  const progressColor = isOver
    ? colorScheme === 'dark'
      ? '#FCA5A5'
      : '#F87171'
    : colorScheme === 'dark'
      ? '#7DD3FC'
      : '#38BDF8';

  return (
    <ThemedView
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      lightColor={colors.card}
      darkColor={colors.card}
    >
      <View style={styles.rowHeader}>
        <ThemedText style={styles.name} numberOfLines={1}>
          {item.categoryName}
        </ThemedText>
        {percent !== null ? (
          <ThemedText
            style={[styles.percent, isOver && { color: progressColor }]}
          >
            {percent}%
          </ThemedText>
        ) : (
          <ThemedText style={styles.percentMuted}>예산 없음</ThemedText>
        )}
      </View>

      <View style={[styles.track, { backgroundColor: colors.border }]}>
        {hasBudget ? (
          <View
            style={[
              styles.fill,
              {
                width: `${Math.max(progress * 100, progress > 0 ? 2 : 0)}%`,
                backgroundColor: progressColor,
              },
            ]}
          />
        ) : null}
      </View>

      <ThemedText style={styles.amounts}>
        {formatCurrency(item.spent)}
        {hasBudget ? ` / ${formatCurrency(item.budget)}` : ' / 예산 없음'}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  list: {
    gap: 10,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  loader: {
    marginVertical: 24,
  },
  empty: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
    paddingVertical: 24,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  name: {
    flex: 1,
    fontSize: 15,
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
