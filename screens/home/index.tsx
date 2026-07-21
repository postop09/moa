import {
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText, ThemedView, BalanceSummary } from '@/shared/ui';
import { HeaderSection } from './ui/HeaderSection';
import { QuickTransactionSection } from './ui/QuickTransactionSection';
import { router } from 'expo-router';
import { useGetBalance } from '@/screens/home/model/useGetBalance';
import { Colors } from '@/shared/config';

export const HomePage = () => {
  const { income, expense, balance, isLoading } = useGetBalance();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <HeaderSection />
          <BalanceSummary
            label="이번 달 잔액"
            balance={balance}
            income={income}
            expense={expense}
            isLoading={isLoading}
            headerRight={
              <Pressable
                onPress={() => router.push('/transactions')}
                style={({ pressed }) => pressed && { opacity: 0.7 }}
              >
                <ThemedText
                  lightColor={colors.accent}
                  darkColor={colors.accent}
                >
                  자세히 보기
                </ThemedText>
              </Pressable>
            }
          />
          <QuickTransactionSection />
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
    gap: 20,
    paddingBottom: 32,
  },
});
