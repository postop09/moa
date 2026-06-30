import { StyleSheet, View } from 'react-native';

import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

function getMonthLabel(date = new Date()) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

export function HeaderSection() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.header}>
      <ThemedText type="title" style={styles.title}>
        모아
      </ThemedText>
      <ThemedText style={[styles.month, { color: colors.icon }]}>
        {getMonthLabel()}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 4,
  },
  title: {
    fontSize: 28,
  },
  month: {
    fontSize: 15,
  },
});
