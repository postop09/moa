import { StyleSheet, View } from 'react-native';

import type { Transaction } from '@/entities/transaction';
import { ThemedText } from '@/shared/ui';

import { TransactionItem } from './TransactionItem';

type Props = {
  transactions: Transaction[];
};

export const TransactionList = ({ transactions }: Props) => {
  if (transactions.length === 0) {
    return (
      <ThemedText style={styles.empty}>
        이 달의 거래 내역이 없습니다.
      </ThemedText>
    );
  }

  return (
    <View style={styles.list}>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 10,
    paddingVertical: 20,
  },
  empty: {
    opacity: 0.6,
    fontSize: 14,
    paddingVertical: 24,
    textAlign: 'center',
  },
});
