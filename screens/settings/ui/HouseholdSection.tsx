import { StyleSheet } from 'react-native';
import { ThemedText, ThemedView } from '@/shared/ui';
import { useGetHouseholds } from '@/features/household';
import { useAuthStore } from '@/shared/model';

export const HouseholdSection = () => {
  const { session } = useAuthStore();
  const { data: households } = useGetHouseholds(session?.user.id ?? '');
  const householdLabel =
    households && households.length > 0
      ? households.map((household) => household.name).join(', ')
      : '가구 없음';

  return (
    <ThemedView style={styles.section}>
      <ThemedText type="subtitle">가계부</ThemedText>
      <ThemedText style={styles.description}>{householdLabel}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 8,
  },
  description: {
    fontSize: 15,
    opacity: 0.7,
    lineHeight: 22,
  },
});
