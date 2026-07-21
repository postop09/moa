import type { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Colors } from '@/shared/config';
import { formatCurrency, useColorScheme } from '@/shared/lib';
import { AmountView, ThemedText, ThemedView } from '@/shared/ui';

type Props = {
  balance: number;
  income: number;
  expense: number;
  isLoading?: boolean;
  label?: string;
  headerRight?: ReactNode;
  bordered?: boolean;
};

export const BalanceSummary = ({
  balance,
  income,
  expense,
  isLoading,
  label,
  headerRight,
  bordered = true,
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ThemedView
      style={[
        styles.card,
        bordered && {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 20,
        },
        !bordered && {
          borderBottomWidth: 1,
          borderColor: colors.border,
        },
      ]}
      lightColor={bordered ? colors.card : undefined}
      darkColor={bordered ? colors.card : undefined}
    >
      <View style={styles.header}>
        <View style={styles.balanceBlock}>
          {label ? <ThemedText style={styles.label}>{label}</ThemedText> : null}
          {isLoading ? (
            <ActivityIndicator color={colors.tint} style={styles.loader} />
          ) : (
            <ThemedText
              style={styles.balance}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {formatCurrency(balance)}
            </ThemedText>
          )}
        </View>
        {headerRight}
      </View>
      {!isLoading ? (
        <View style={styles.hint}>
          <AmountView amount={income} color={colors.income} />
          <AmountView amount={expense} color={colors.expense} />
        </View>
      ) : null}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceBlock: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
});
