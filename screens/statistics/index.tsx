import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText, ThemedView } from '@/shared/ui';
import { CategoryExpenseSection } from './ui/CategoryExpenseSection';
import { SummarySection } from './ui/SummarySection';
import { TrendSection } from './ui/TrendSection';
export const StatisticsPage = () => {
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
          <SummarySection />
          <CategoryExpenseSection />
          <TrendSection />
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
  title: {
    fontSize: 28,
  },
});
