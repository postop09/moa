import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import {
  formatCurrency,
  type Transaction,
  type UpdateTransactionReq,
} from '@/entities/transaction';
import { useUpdateTransaction } from '@/features/transaction';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';

import { formatMonthDate } from '../lib/date';
import { useDeleteTransaction } from '../model/useDeleteTransaction';
import { TransactionEditModal } from './TransactionEdit.modal';

type Props = {
  transaction: Transaction;
};

export const TransactionItem = ({ transaction }: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const typeColor =
    transaction.type === 'income' ? colors.income : colors.expense;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { handleDelete, isPending: isDeleting } = useDeleteTransaction();
  const { mutate: update, isPending: isUpdating } = useUpdateTransaction();

  const handleSubmit = (payload: UpdateTransactionReq) => {
    update(payload, {
      onSuccess: () => setIsEditOpen(false),
    });
  };

  return (
    <>
      <ThemedView
        style={[styles.container, { borderColor: colors.border }]}
        lightColor={colors.card}
        darkColor={colors.card}
      >
        <View style={styles.header}>
          <View style={styles.dateContainer}>
            <ThemedText style={[styles.date, { color: colors.icon }]}>
              {transaction.transactionDt
                ? formatMonthDate(transaction.transactionDt)
                : '-'}
            </ThemedText>
            <View style={styles.actions}>
              <Pressable
                onPress={() => setIsEditOpen(true)}
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
              {transaction.name || '이름 없음'}
            </ThemedText>
            <ThemedText style={[styles.amount, { color: typeColor }]}>
              {formatCurrency(transaction.amount ?? 0)}
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      <TransactionEditModal
        visible={isEditOpen}
        transaction={transaction}
        isLoading={isUpdating}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
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
