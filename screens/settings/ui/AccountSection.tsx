import { StyleSheet } from 'react-native';

import { useSession } from '@/entities/auth';
import { ThemedText, ThemedView } from '@/shared/ui';

import { useSettingsProfile } from '../model/useSettingsProfile';

export function AccountSection() {
  const { session } = useSession();
  const { data: profile } = useSettingsProfile();

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
