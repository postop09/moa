import { StyleSheet, View } from 'react-native';

import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { useAuthStore } from '@/entities/auth';
import { ThemedText } from '@/shared/ui';

export const AccountSection = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { session, profile } = useAuthStore();

  const nickname = profile?.nickname ?? '-';
  const email = profile?.email ?? session?.user.email ?? '-';

  return (
    <View style={styles.section}>
      <ThemedText type="subtitle">계정</ThemedText>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={styles.row}>
          <ThemedText style={[styles.label, { color: colors.icon }]}>
            닉네임
          </ThemedText>
          <ThemedText style={styles.value}>{nickname}</ThemedText>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.row}>
          <ThemedText style={[styles.label, { color: colors.icon }]}>
            이메일
          </ThemedText>
          <ThemedText style={styles.value} numberOfLines={1}>
            {email}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
  },
});
