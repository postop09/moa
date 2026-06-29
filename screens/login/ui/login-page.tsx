import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GoogleSignInButton } from '@/features/google-sign-in';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';

export function LoginPage() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.hero}>
          <ThemedText type="title" style={styles.title}>
            모아
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.icon }]}>
            간편하게 기록하고{'\n'}현명하게 관리하세요
          </ThemedText>
        </View>

        <View style={styles.actions}>
          <GoogleSignInButton />
          <ThemedText style={[styles.hint, { color: colors.icon }]}>
            Google 계정으로 로그인하면 서비스를 이용할 수 있습니다
          </ThemedText>
        </View>
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
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'space-between',
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 28,
  },
  actions: {
    gap: 14,
    paddingBottom: 12,
  },
  hint: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 20,
  },
});
