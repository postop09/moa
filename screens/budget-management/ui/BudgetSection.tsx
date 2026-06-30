import type { Category, CategoryType } from '@/entities/category';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';
import { Pressable, StyleSheet, View } from 'react-native';

import { BudgetListItem } from './BudgetListItem';

type BudgetSectionProps = {
  title: string;
  categories: Category[];
  onAdd: () => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  deletingId: string | null;
  isDeleting: boolean;
};

export function BudgetSection({
  title,
  categories,
  onAdd,
  onEdit,
  onDelete,
  deletingId,
  isDeleting,
}: BudgetSectionProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <ThemedText type="subtitle">{title}</ThemedText>
        <Pressable onPress={onAdd}>
          <ThemedText style={[styles.addText, { color: colors.tint }]}>
            + 추가
          </ThemedText>
        </Pressable>
      </View>

      {categories.length === 0 ? (
        <ThemedText style={styles.empty}>등록된 예산이 없습니다.</ThemedText>
      ) : (
        categories.map((category) => (
          <BudgetListItem
            key={category.id}
            category={category}
            onEdit={onEdit}
            onDelete={onDelete}
            isDeleting={isDeleting && deletingId === category.id}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addText: {
    fontSize: 14,
    fontWeight: '600',
  },
  empty: {
    opacity: 0.6,
    fontSize: 14,
    paddingVertical: 8,
  },
});
