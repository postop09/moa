import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';

export function ManagementSection() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ThemedView style={styles.section}>
      <ThemedText type="subtitle">관리</ThemedText>
      <Pressable
        onPress={() => router.push('/budget-management')}
        style={[styles.menuButton, { borderColor: colors.border }]}
      >
        <ThemedText style={styles.menuButtonText}>예산 관리</ThemedText>
        <ThemedText style={[styles.menuChevron, { color: colors.icon }]}>
          ›
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 8,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuChevron: {
    fontSize: 22,
    lineHeight: 22,
  },
});
