import { StyleSheet } from 'react-native';

import { useMyHouseholds } from '@/entities/household';
import { ThemedText, ThemedView } from '@/shared/ui';

export function HouseholdSection() {
  const { data: households } = useMyHouseholds();

  const householdLabel =
    households && households.length > 0
      ? households.map((household) => household.name).join(', ')
      : '가구 없음';

  return (
    <ThemedView style={styles.section}>
      <ThemedText type="subtitle">가구</ThemedText>
      <ThemedText style={styles.description}>{householdLabel}</ThemedText>
    </ThemedView>
  );
}

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
