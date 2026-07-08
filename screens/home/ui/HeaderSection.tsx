import { StyleSheet, View } from 'react-native';

import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

import { HouseholdList } from './HouseholdList';
import { QuickActionMenu } from './QuickActionMenu';

const getMonthLabel = (date = new Date()) => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
};

export const HeaderSection = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <HouseholdList />
        <QuickActionMenu />
      </View>
      <ThemedText style={[styles.month, { color: colors.icon }]}>
        {getMonthLabel()}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    gap: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  month: {
    fontSize: 15,
  },
});
