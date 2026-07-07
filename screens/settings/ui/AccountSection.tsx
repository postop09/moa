import { StyleSheet } from 'react-native';
import { useAuthStore } from '@/shared/model';
import { ThemedText, ThemedView } from '@/shared/ui';

export const AccountSection = () => {
  const { session, profile } = useAuthStore();

  return (
    <ThemedView style={styles.section}>
      <ThemedText type="subtitle">계정</ThemedText>
      <ThemedText style={styles.description}>
        {profile?.nickname ?? session?.user.email ?? '로그인됨'}
      </ThemedText>
      {profile?.email ? (
        <ThemedText style={styles.description}>{profile.email}</ThemedText>
      ) : null}
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
