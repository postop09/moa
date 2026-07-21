import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { formatCurrency, type Transaction } from '@/entities/transaction';
import { formatMonthDate } from '@/features/transaction';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';

import { useDeleteTransaction } from '../model/useDeleteTransaction';
type Props = {
  transaction: Transaction;
};

export const TransactionItem = ({ transaction }: Props) => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const typeColor =
    transaction.type === 'income' ? colors.income : colors.expense;
  const { handleDelete, isPending: isDeleting } = useDeleteTransaction();

  return (
    <ThemedView
      style={[styles.container, { borderColor: colors.border }]}
      lightColor={colors.card}
      darkColor={colors.card}
    >
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <View style={styles.meta}>
            <View style={[styles.typeBadge, { backgroundColor: typeColor }]} />
            <ThemedText style={[styles.date, { color: colors.icon }]}>
              {transaction.transactionDt
                ? formatMonthDate(transaction.transactionDt)
                : '-'}
              {' · '}
              {transaction.categoryName || '카테고리 없음'}
            </ThemedText>
          </View>
          <View style={styles.actions}>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/transaction-form',
                  params: { id: transaction.id },
                })
              }
              accessibilityLabel="수정하기"
              hitSlop={8}
              style={({ pressed }) => [
                styles.actionButton,
                { borderColor: colors.border },
                pressed && { opacity: 0.7 },
              ]}
            >
              <MaterialIcons name="edit" size={20} color={colors.text} />
            </Pressable>
            <Pressable
              onPress={() => handleDelete(transaction.id, transaction.name)}
              disabled={isDeleting}
              accessibilityLabel="삭제하기"
              hitSlop={8}
              style={({ pressed }) => [
                styles.actionButton,
                {
                  borderColor: colors.expense,
                  opacity: isDeleting ? 0.6 : pressed ? 0.7 : 1,
                },
              ]}
            >
              <MaterialIcons
                name="delete-outline"
                size={20}
                color={colors.expense}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.content}>
          <ThemedText style={styles.name} numberOfLines={1}>
            {transaction.name || transaction.categoryName || '이름 없음'}
          </ThemedText>
          <ThemedText style={[styles.amount, { color: typeColor }]}>
            {formatCurrency(transaction.amount ?? 0)}
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 12,
  },
  header: {
    gap: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  typeBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
  },
  date: {
    fontSize: 14,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
