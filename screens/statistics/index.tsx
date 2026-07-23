import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { CategoryBudgetChart } from '@/widgets/categoryBudgetChart';
import { CategorySpendingDonut } from '@/widgets/categorySpendingDonut';
import { DailyExpenseChart } from '@/widgets/dailyExpenseChart';

import { useGetMonthlyStatistics } from './model/useGetMonthlyStatistics';
import { MonthSelector } from './ui/MonthSelector';

export const StatisticsPage = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const {
    yearMonth,
    setYearMonth,
    transactions,
    categories,
    isLoading,
    hasHousehold,
  } = useGetMonthlyStatistics();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText type="title" style={styles.title}>
            통계
          </ThemedText>

          {!hasHousehold ? (
            <ThemedText style={styles.empty}>
              가구를 선택하면 통계를 확인할 수 있어요
            </ThemedText>
          ) : (
            <>
              <MonthSelector yearMonth={yearMonth} onChange={setYearMonth} />

              {isLoading ? (
                <ActivityIndicator color={colors.tint} style={styles.loader} />
              ) : (
                <>
                  <CategorySpendingDonut transactions={transactions} />
                  <DailyExpenseChart
                    transactions={transactions}
                    yearMonth={yearMonth}
                  />
                  <CategoryBudgetChart
                    categories={categories}
                    transactions={transactions}
                  />
                </>
              )}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
  },
  empty: {
    fontSize: 15,
    opacity: 0.7,
    lineHeight: 22,
    marginTop: 8,
  },
  loader: {
    marginVertical: 8,
  },
});
