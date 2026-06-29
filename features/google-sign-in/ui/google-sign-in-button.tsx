import AntDesign from '@expo/vector-icons/AntDesign';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

import { signInWithGoogle } from '@/entities';
import { useMutation } from '@tanstack/react-query';

export function GoogleSignInButton() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const { mutate, isPending } = useMutation({
    mutationFn: signInWithGoogle,
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : '다시 시도해주세요.';

      if (message !== '로그인이 취소되었습니다.') {
        Alert.alert('로그인 실패', message);
      }
    },
  });

  return (
    <Pressable
      onPress={() => mutate()}
      disabled={isPending}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed || isPending ? 0.85 : 1,
        },
      ]}
    >
      {isPending ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <View style={styles.content}>
          <AntDesign name="google" size={20} color="#EA4335" />
          <ThemedText style={styles.label}>Google로 계속하기</ThemedText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
