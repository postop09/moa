import { StyleSheet, View } from 'react-native';

import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

export function HeroSection() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.hero}>
      <ThemedText type="title" style={styles.title}>
        모아
      </ThemedText>
      <ThemedText style={[styles.subtitle, { color: colors.icon }]}>
        간편하게 기록하고{'\n'}현명하게 관리하세요
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
