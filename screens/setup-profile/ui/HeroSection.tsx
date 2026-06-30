import { StyleSheet } from 'react-native';

import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

export function HeroSection() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <>
      <ThemedText type="title" style={styles.title}>
        프로필 설정
      </ThemedText>
      <ThemedText style={[styles.subtitle, { color: colors.icon }]}>
        서비스에서 사용할{'\n'}닉네임을 입력해주세요
      </ThemedText>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 26,
  },
});
