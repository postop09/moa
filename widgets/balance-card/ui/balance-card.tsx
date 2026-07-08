import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { formatCurrency, useMonthlySummary } from '@/entities/transaction';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { AmountView } from './AmountView';

export const BalanceCard = () => {
  const { data, isLoading } = useMonthlySummary();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const balance = data?.balance ?? 0;
  const income = data?.income ?? 0;
  const expense = data?.expense ?? 0;

  return (
    <ThemedView
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
        },
      ]}
      lightColor={colors.card}
      darkColor={colors.card}
    >
      <ThemedText
        style={styles.label}
        lightColor={colors.text}
        darkColor={colors.text}
      >
        이번 달 잔액
      </ThemedText>
      {isLoading ? (
        <ActivityIndicator color="#fff" style={styles.loader} />
      ) : (
        <ThemedText
          style={styles.balance}
          lightColor={colors.text}
          darkColor={colors.text}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {formatCurrency(balance)}
        </ThemedText>
      )}
      {!isLoading && (
        <View style={styles.hint}>
          <AmountView amount={income} color={colors.income} />
          <AmountView amount={expense} color={colors.expense} />
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 24,
    gap: 8,
  },
  label: {
    fontSize: 14,
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
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 44,
  },
});
