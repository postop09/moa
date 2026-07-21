import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, View } from 'react-native';
import type { Category } from '@/entities/category';
import { Colors } from '@/shared/config';
import { formatCurrency, useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { useDeleteCategory } from '../model/useDeleteCategory';
import { useUpdateCategory } from '../model/useUpdateCategory';
import { CategoryEditModal } from './CategoryEdit.modal';

type Props = {
  category: Category;
};

export const CategoryCard = ({ category }: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const typeColor =
    category.type === 'expense' ? colors.expense : colors.income;
  const { handleDelete, isPending: isDeleting } = useDeleteCategory();
  const {
    mutate: handleUpdate,
    isPending: isUpdating,
    isEditOpen,
    setIsEditOpen,
  } = useUpdateCategory();

  return (
    <>
      <ThemedView
        style={[styles.container, { borderColor: colors.border }]}
        lightColor={colors.card}
        darkColor={colors.card}
      >
        <View style={styles.header}>
          <View
            style={[styles.typeBadge, { backgroundColor: typeColor }]}
          ></View>
          <ThemedText style={styles.name}>{category.name}</ThemedText>
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
              onPress={() => handleDelete(category.id, category.name)}
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
        <ThemedText style={[styles.budget, { color: colors.icon }]}>
          예산 {category.budget ? formatCurrency(category.budget) : '미설정'}
        </ThemedText>
      </ThemedView>

      <CategoryEditModal
        visible={isEditOpen}
        category={category}
        isLoading={isUpdating}
        onClose={() => setIsEditOpen(false)}
        onSubmit={(payload) =>
          payload.id &&
          handleUpdate({
            id: payload.id,
            name: payload.name,
            type: payload.type,
            budget: payload.budget,
          })
        }
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
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  typeBadge: {
    width: 12,
    height: 12,
    borderRadius: 12,
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
    justifyContent: 'flex-end',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
