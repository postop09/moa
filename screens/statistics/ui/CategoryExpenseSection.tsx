import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import {
  formatCurrency,
  useCategoryExpenses,
} from '@/entities/transaction';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';

export function CategoryExpenseSection() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { data: categoryExpenses, isLoading } = useCategoryExpenses();

  const pieData =
    categoryExpenses?.map((item) => ({
      value: item.value,
      color: item.color,
      text: item.name,
    })) ?? [];

  const totalExpense =
    categoryExpenses?.reduce((sum, c) => sum + c.value, 0) ?? 0;

  return (
    <ThemedView
      style={[styles.card, { borderColor: colors.border }]}
      lightColor={colors.card}
      darkColor={colors.card}
    >
      <ThemedText type="subtitle" style={styles.cardTitle}>
        카테고리별 지출
      </ThemedText>

      {isLoading ? (
        <ThemedText style={styles.empty}>불러오는 중...</ThemedText>
      ) : pieData.length === 0 ? (
        <ThemedText style={styles.empty}>지출 데이터가 없어요</ThemedText>
      ) : (
        <View style={styles.pieContainer}>
          <PieChart
            data={pieData}
            donut
            radius={100}
            innerRadius={60}
            innerCircleColor={colors.card}
            centerLabelComponent={() => (
              <View style={styles.centerLabel}>
                <ThemedText style={styles.centerLabelText}>총 지출</ThemedText>
                <ThemedText style={styles.centerAmount}>
                  {formatCurrency(totalExpense)}
                </ThemedText>
              </View>
            )}
          />
          <View style={styles.legend}>
            {categoryExpenses?.map((item) => (
              <View key={item.name} style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: item.color }]}
                />
                <ThemedText style={styles.legendLabel}>{item.name}</ThemedText>
                <ThemedText style={styles.legendValue}>
                  {formatCurrency(item.value)}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 16,
  },
  cardTitle: {
    fontSize: 18,
  },
  pieContainer: {
    alignItems: 'center',
    gap: 20,
  },
  centerLabel: {
    alignItems: 'center',
    gap: 4,
  },
  centerLabelText: {
    fontSize: 12,
    opacity: 0.6,
  },
  centerAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  legend: {
    width: '100%',
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    flex: 1,
    fontSize: 14,
  },
  legendValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    opacity: 0.6,
    paddingVertical: 24,
  },
});
