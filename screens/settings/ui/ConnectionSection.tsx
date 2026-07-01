import { StyleSheet } from 'react-native';
import { isSupabaseConfigured } from '@/shared/config';
import { ThemedText, ThemedView } from '@/shared/ui';

export const ConnectionSection = () => {
  return (
    <ThemedView style={styles.section}>
      <ThemedText type="subtitle">연결 상태</ThemedText>
      <ThemedText style={styles.description}>
        Supabase:{' '}
        {isSupabaseConfigured
          ? '연결됨 (프로필·가구)'
          : '미연결 (프로필·가구 목업)'}
      </ThemedText>
      <ThemedText style={styles.description}>
        거래·카테고리: 목업 데이터
      </ThemedText>
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
