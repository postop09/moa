import { StyleSheet, View } from 'react-native';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';
import { GoogleSignInButton } from './GoogleSignInButton';

export const LoginSection = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.actions}>
      <GoogleSignInButton />
      <ThemedText style={[styles.hint, { color: colors.icon }]}>
        Google 계정으로 로그인하면 서비스를 이용할 수 있습니다
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
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
