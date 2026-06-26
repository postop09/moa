import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { createProfile } from '@/entities/profile/api/createProfile';
import { signOut, useSession } from '@/entities/session';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { FormField, ThemedText, ThemedView } from '@/shared/ui';

export function SetupProfilePage() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { session } = useSession();
  const isPending = false;
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const trimmed = nickname.trim();

    if (!trimmed) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    if (trimmed.length > 20) {
      setError('닉네임은 20자 이하로 입력해주세요.');
      return;
    }

    setError('');

    await createProfile({
      id: session?.user.id || '',
      email: session?.user.email || '',
      nickname: trimmed,
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (submitError) {
      Alert.alert(
        '로그아웃 실패',
        submitError instanceof Error
          ? submitError.message
          : '다시 시도해주세요.',
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.content}
        >
          <View style={styles.hero}>
            <ThemedText type="title" style={styles.title}>
              프로필 설정
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.icon }]}>
              서비스에서 사용할{'\n'}닉네임을 입력해주세요
            </ThemedText>
          </View>

          <View style={styles.form}>
            <ThemedText style={styles.emailLabel}>이메일</ThemedText>
            <ThemedText style={[styles.email, { color: colors.icon }]}>
              {session?.user.email ?? '-'}
            </ThemedText>

            <FormField
              label="닉네임"
              value={nickname}
              onChangeText={(value) => {
                setNickname(value);
                if (error) {
                  setError('');
                }
              }}
              placeholder="닉네임을 입력하세요"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={20}
              error={error}
              editable={!isPending}
            />
          </View>

          <View style={styles.actions}>
            <Pressable
              onPress={handleSubmit}
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
              onPress={handleSignOut}
              disabled={isPending}
              style={styles.signOutButton}
            >
              <ThemedText style={[styles.signOutText, { color: colors.icon }]}>
                다른 계정으로 로그인
              </ThemedText>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'space-between',
  },
  hero: {
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 26,
  },
  form: {
    gap: 20,
  },
  emailLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  email: {
    fontSize: 16,
    marginTop: -12,
  },
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
