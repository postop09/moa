import { Pressable, StyleSheet } from 'react-native';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';
import { useSignOut } from '@/features/auth';

export const SignOutButton = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { mutate: handleSignOut } = useSignOut();

  return (
    <Pressable
      onPress={() => handleSignOut()}
      style={[styles.signOutButton, { borderColor: colors.expense }]}
    >
      <ThemedText style={[styles.signOutText, { color: colors.expense }]}>
        로그아웃
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
