import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';

export function AddTransactionPage() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ThemedText type="title" style={styles.title}>
          지출 입력
        </ThemedText>
        <ThemedView
          style={[styles.placeholder, { borderColor: colors.border }]}
          lightColor={colors.card}
          darkColor={colors.card}
        >
          <ThemedText style={styles.description}>
            금액, 카테고리, 메모 입력 폼이 여기에 추가됩니다.
          </ThemedText>
        </ThemedView>
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
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 28,
  },
  placeholder: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
  },
  description: {
    fontSize: 15,
    opacity: 0.7,
    lineHeight: 22,
  },
});
