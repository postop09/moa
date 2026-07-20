import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/shared/ui';
import { BalanceCard } from '@/widgets/balanceCard';
import { HeaderSection } from './ui/HeaderSection';
import { QuickTransactionSection } from './ui/QuickTransactionSection';

export const HomePage = () => {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <HeaderSection />
          <BalanceCard />
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
