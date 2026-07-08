import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { formatCurrency } from '@/entities/transaction';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';

type MonthlySummaryProps = {
  income: number;
  expense: number;
  isLoading?: boolean;
};

const SummaryItem = ({
  label,
  amount,
  color,
  isLoading,
}: {
  label: string;
  amount: number;
  color: string;
  isLoading?: boolean;
}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ThemedView
      style={[styles.item, { borderColor: colors.border }]}
      lightColor={colors.card}
      darkColor={colors.card}
    >
      <View style={[styles.dot, { backgroundColor: color }]} />
      <ThemedText style={styles.label}>{label}</ThemedText>
      {isLoading ? (
        <ActivityIndicator color={color} />
      ) : (
        <ThemedText style={[styles.amount, { color }]} numberOfLines={1}>
          {formatCurrency(amount)}
        </ThemedText>
      )}
    </ThemedView>
  );
};

export const MonthlySummary = ({
  income,
  expense,
  isLoading,
}: MonthlySummaryProps) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.row}>
      <SummaryItem
        label="수입"
        amount={income}
        color={colors.income}
        isLoading={isLoading}
      />
      <SummaryItem
        label="지출"
        amount={expense}
        color={colors.expense}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  item: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 14,
    opacity: 0.7,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
  },
});
