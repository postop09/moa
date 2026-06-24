import { useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { signOut, useSession } from '@/entities/session';
import { Colors, isSupabaseConfigured } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';

export function SettingsPage() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (error) {
      Alert.alert(
        '로그아웃 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ThemedText type="title" style={styles.title}>
          설정
        </ThemedText>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">계정</ThemedText>
          <ThemedText style={styles.description}>
            {session?.user.email ?? '로그인됨'}
          </ThemedText>
        </ThemedView>

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

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">연결 상태</ThemedText>
          <ThemedText style={styles.description}>
            Supabase:{' '}
            {isSupabaseConfigured ? '연결됨' : '미연결 (목업 데이터 사용 중)'}
          </ThemedText>
        </ThemedView>

        <Pressable
          onPress={handleSignOut}
          style={[styles.signOutButton, { borderColor: colors.expense }]}
        >
          <ThemedText style={[styles.signOutText, { color: colors.expense }]}>
            로그아웃
          </ThemedText>
        </Pressable>
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
  signOutButton: {
    marginTop: 'auto',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
