import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet } from 'react-native';

import { useSignOut } from '@/features/auth';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

export const SignOutButton = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { mutate: handleSignOut } = useSignOut();

  return (
    <Pressable
      onPress={() => handleSignOut()}
      style={({ pressed }) => [
        styles.signOutButton,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <MaterialIcons name="logout" size={20} color={colors.expense} />
      <ThemedText style={[styles.signOutText, { color: colors.expense }]}>
        로그아웃
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
