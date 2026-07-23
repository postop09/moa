import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, View } from 'react-native';

import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

import { formatYearMonthLabel, shiftYearMonth } from '../lib/yearMonth';

type Props = {
  yearMonth: string;
  onChange: (yearMonth: string) => void;
};

export const MonthSelector = ({ yearMonth, onChange }: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onChange(shiftYearMonth(yearMonth, -1))}
        hitSlop={8}
        accessibilityLabel="이전 달"
        style={({ pressed }) => [
          styles.button,
          { borderColor: colors.border },
          pressed && { opacity: 0.7 },
        ]}
      >
        <MaterialIcons name="chevron-left" size={24} color={colors.text} />
      </Pressable>

      <ThemedText style={styles.label}>
        {formatYearMonthLabel(yearMonth)}
      </ThemedText>

      <Pressable
        onPress={() => onChange(shiftYearMonth(yearMonth, 1))}
        hitSlop={8}
        accessibilityLabel="다음 달"
        style={({ pressed }) => [
          styles.button,
          { borderColor: colors.border },
          pressed && { opacity: 0.7 },
        ]}
      >
        <MaterialIcons name="chevron-right" size={24} color={colors.text} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  button: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
  },
});
