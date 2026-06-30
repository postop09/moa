import { useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet } from 'react-native';

import { signOut } from '@/entities/auth';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

export function SignOutButton() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

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
    <Pressable
      onPress={handleSignOut}
      style={[styles.signOutButton, { borderColor: colors.expense }]}
    >
      <ThemedText style={[styles.signOutText, { color: colors.expense }]}>
        로그아웃
      </ThemedText>
    </Pressable>
  );
}

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
