import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';
import { StyleSheet, View } from 'react-native';

export const HeroSection = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.hero}>
      <ThemedText type="title" style={styles.title}>
        가계부 생성
      </ThemedText>
      <ThemedText style={[styles.subtitle, { color: colors.icon }]}>
        서비스에서 사용할{'\n'}가계부를 만들어 주세요
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
