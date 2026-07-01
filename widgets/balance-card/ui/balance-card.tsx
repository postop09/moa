import { ActivityIndicator, StyleSheet } from 'react-native';
import { formatCurrency } from '@/entities/transaction';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';

type BalanceCardProps = {
  balance: number;
  isLoading?: boolean;
};

export const BalanceCard = ({ balance, isLoading }: BalanceCardProps) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const isNegative = balance < 0;
  return (
    <ThemedView
      style={[styles.card, { backgroundColor: colors.accent }]}
      lightColor={colors.accent}
      darkColor={colors.accent}
    >
      <ThemedText style={styles.label} lightColor="#E0F2FE" darkColor="#E0F2FE">
        이번 달 잔액
      </ThemedText>
      {isLoading ? (
        <ActivityIndicator color="#fff" style={styles.loader} />
      ) : (
        <ThemedText
          style={styles.amount}
          lightColor="#fff"
          darkColor="#fff"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {formatCurrency(balance)}
        </ThemedText>
      )}
      {!isLoading && (
        <ThemedText
          style={styles.hint}
          lightColor="#BAE6FD"
          darkColor="#BAE6FD"
        >
          {isNegative ? '지출이 수입을 초과했어요' : '수입 - 지출'}
        </ThemedText>
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
  amount: {
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 44,
  },
  hint: {
    fontSize: 13,
  },
  loader: {
    alignSelf: 'flex-start',
    marginVertical: 12,
  },
});
