import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';

import { useTransactions } from './model/useTransactions';
import { MonthSelector } from './ui/MonthSelector';
import { MonthSummary } from './ui/MonthSummary';
import { TransactionList } from './ui/TransactionList';

export const TransactionsPage = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const {
    yearMonth,
    setYearMonth,
    transactions,
    income,
    expense,
    balance,
    isLoading,
    isRefetching,
  } = useTransactions();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <ThemedText type="title" style={styles.title}>
            거래 내역
          </ThemedText>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <MonthSelector yearMonth={yearMonth} onChange={setYearMonth} />
          <MonthSummary
            balance={balance}
            income={income}
            expense={expense}
            isLoading={isLoading}
          />
          {isLoading ? (
            <ActivityIndicator style={styles.loader} color={colors.tint} />
          ) : (
            <TransactionList transactions={transactions} />
          )}
        </ScrollView>

        {isRefetching && !isLoading ? (
          <ActivityIndicator style={styles.refetch} color={colors.tint} />
        ) : null}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  backButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    fontSize: 22,
  },
  loader: {
    marginTop: 40,
  },
  refetch: {
    marginBottom: 8,
  },
  content: {
    padding: 20,

    paddingBottom: 32,
  },
});
