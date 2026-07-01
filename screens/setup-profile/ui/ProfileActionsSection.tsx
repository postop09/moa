import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

type ProfileActionsSectionProps = {
  isPending: boolean;
  onSubmit: () => void;
  onSignOut: () => void;
};

export const ProfileActionsSection = ({
  isPending,
  onSubmit,
  onSignOut,
}: ProfileActionsSectionProps) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.actions}>
      <Pressable
        onPress={onSubmit}
        disabled={isPending}
        style={({ pressed }) => [
          styles.submitButton,
          {
            backgroundColor: colors.tint,
            opacity: pressed || isPending ? 0.85 : 1,
          },
        ]}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemedText style={styles.submitText}>시작하기</ThemedText>
        )}
      </Pressable>

      <Pressable
        onPress={onSignOut}
        disabled={isPending}
        style={styles.signOutButton}
      >
        <ThemedText style={[styles.signOutText, { color: colors.icon }]}>
          다른 계정으로 로그인
        </ThemedText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    gap: 14,
    paddingBottom: 12,
  },
  submitButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signOutButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  signOutText: {
    fontSize: 14,
  },
});
