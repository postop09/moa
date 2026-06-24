import { Alert, Pressable, StyleSheet, View } from 'react-native';

import type { Category } from '@/entities/category';
import { formatCurrency } from '@/entities/transaction';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';

type BudgetListItemProps = {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  isDeleting?: boolean;
};

export function BudgetListItem({
  category,
  onEdit,
  onDelete,
  isDeleting,
}: BudgetListItemProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const typeColor =
    category.type === 'expense' ? colors.expense : colors.income;

  const handleDelete = () => {
    Alert.alert('예산 삭제', `'${category.name}' 항목을 삭제할까요?`, [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제하기',
        style: 'destructive',
        onPress: () => onDelete(category),
      },
    ]);
  };

  return (
    <ThemedView
      style={[styles.container, { borderColor: colors.border }]}
      lightColor={colors.card}
      darkColor={colors.card}
    >
      <View style={styles.header}>
        <View style={[styles.typeBadge, { backgroundColor: typeColor }]}>
          <ThemedText style={styles.typeText}>
            {category.type === 'expense' ? '지출' : '수입'}
          </ThemedText>
        </View>
        <ThemedText style={styles.name}>{category.name}</ThemedText>
      </View>

      <ThemedText style={[styles.budget, { color: colors.icon }]}>
        예산{' '}
        {category.budget !== null ? formatCurrency(category.budget) : '미설정'}
      </ThemedText>

      <View style={styles.actions}>
        <Pressable
          onPress={() => onEdit(category)}
          style={[styles.actionButton, { borderColor: colors.border }]}
        >
          <ThemedText style={styles.actionText}>수정하기</ThemedText>
        </Pressable>
        <Pressable
          onPress={handleDelete}
          disabled={isDeleting}
          style={[
            styles.actionButton,
            { borderColor: colors.expense, opacity: isDeleting ? 0.6 : 1 },
          ]}
        >
          <ThemedText style={[styles.actionText, { color: colors.expense }]}>
            삭제하기
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  typeBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
  },
  budget: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
