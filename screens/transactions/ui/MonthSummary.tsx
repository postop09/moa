import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { formatCurrency } from '@/entities/transaction';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView, AmountView } from '@/shared/ui';

type Props = {
  balance: number;
  income: number;
  expense: number;
  isLoading?: boolean;
};

export const MonthSummary = ({
  balance,
  income,
  expense,
  isLoading,
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ThemedView
      style={[
        styles.card,
        {
          borderColor: colors.border,
        },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.tint} style={styles.loader} />
      ) : (
        <>
          <ThemedText
            style={styles.balance}
            lightColor={colors.text}
            darkColor={colors.text}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {formatCurrency(balance)}
          </ThemedText>
          <View style={styles.hint}>
            <AmountView amount={income} color={colors.income} />
            <AmountView amount={expense} color={colors.expense} />
          </View>
        </>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  loader: {
    alignSelf: 'flex-start',
    marginVertical: 12,
  },
  balance: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 44,
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
