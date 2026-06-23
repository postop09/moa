import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { isSupabaseConfigured } from '@/shared/config';
import { ThemedText, ThemedView } from '@/shared/ui';

export function SettingsPage() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ThemedText type="title" style={styles.title}>
          설정
        </ThemedText>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">연결 상태</ThemedText>
          <ThemedText style={styles.description}>
            Supabase:{' '}
            {isSupabaseConfigured ? '연결됨' : '미연결 (목업 데이터 사용 중)'}
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
    gap: 20,
  },
  title: {
    fontSize: 28,
  },
  section: {
    gap: 8,
  },
  description: {
    fontSize: 15,
    opacity: 0.7,
    lineHeight: 22,
  },
});
