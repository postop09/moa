import { Pressable, StyleSheet, View } from 'react-native';
import type { TransactionType } from '@/entities/transaction';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';
type TransactionTypeSelectorProps = {
  value: TransactionType;
  onChange: (value: TransactionType) => void;
};
const OPTIONS: {
  label: string;
  value: TransactionType;
}[] = [
  { label: '지출', value: 'expense' },
  { label: '수입', value: 'income' },
];
export const TransactionTypeSelector = ({
  value,
  onChange,
}: TransactionTypeSelectorProps) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>유형</ThemedText>
      <View style={[styles.row, { borderColor: colors.border }]}>
        {OPTIONS.map((option) => {
          const isSelected = value === option.value;
          const accentColor =
            option.value === 'expense' ? colors.expense : colors.income;
          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              style={[
                styles.option,
                {
                  backgroundColor: isSelected ? accentColor : colors.card,
                  borderColor: isSelected ? accentColor : colors.border,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.optionText,
                  { color: isSelected ? '#fff' : colors.text },
                ]}
              >
                {option.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
