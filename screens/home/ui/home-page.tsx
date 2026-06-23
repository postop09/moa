import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDailyExpenses, useMonthlySummary } from '@/entities/transaction';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { BalanceCard } from '@/widgets/balance-card';
import { ExpenseChart } from '@/widgets/expense-chart';
import { MonthlySummary } from '@/widgets/monthly-summary';

function getMonthLabel(date = new Date()) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

export function HomePage() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const { data: summary, isLoading: summaryLoading } = useMonthlySummary();
  const { data: dailyExpenses, isLoading: chartLoading } = useDailyExpenses();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              모아
            </ThemedText>
            <ThemedText style={[styles.month, { color: colors.icon }]}>
              {getMonthLabel()}
            </ThemedText>
          </View>

          <BalanceCard
            balance={summary?.balance ?? 0}
            isLoading={summaryLoading}
          />

          <MonthlySummary
            income={summary?.income ?? 0}
            expense={summary?.expense ?? 0}
            isLoading={summaryLoading}
          />

          <ExpenseChart data={dailyExpenses ?? []} isLoading={chartLoading} />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 20,
    paddingBottom: 32,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 28,
  },
  month: {
    fontSize: 15,
  },
});
