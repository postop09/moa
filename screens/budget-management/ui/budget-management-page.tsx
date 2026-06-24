import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Category, CategoryType } from '@/entities/category';
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '@/entities/category';
import {
  BudgetEditorModal,
  BudgetListItem,
} from '@/features/budget-management';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';

type EditorState =
  | { mode: 'closed' }
  | { mode: 'create'; defaultType: CategoryType }
  | { mode: 'edit'; category: Category };

export function BudgetManagementPage() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const { data: categories = [], isLoading, isRefetching } = useCategories();
  const { mutateAsync: createCategory, isPending: isCreating } =
    useCreateCategory();
  const { mutateAsync: updateCategory, isPending: isUpdating } =
    useUpdateCategory();
  const { mutateAsync: deleteCategory, isPending: isDeleting } =
    useDeleteCategory();

  const [editorState, setEditorState] = useState<EditorState>({
    mode: 'closed',
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const grouped = useMemo(() => {
    return {
      expense: categories.filter((category) => category.type === 'expense'),
      income: categories.filter((category) => category.type === 'income'),
    };
  }, [categories]);

  const handleSubmit = async (payload: {
    name: string;
    type: CategoryType;
    budget: number | null;
  }) => {
    try {
      if (editorState.mode === 'create') {
        await createCategory(payload);
      } else if (editorState.mode === 'edit') {
        await updateCategory({
          id: editorState.category.id,
          ...payload,
        });
      }

      setEditorState({ mode: 'closed' });
    } catch (error) {
      Alert.alert(
        '저장 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    }
  };

  const handleDelete = async (category: Category) => {
    try {
      setDeletingId(category.id);
      await deleteCategory(category.id);
    } catch (error) {
      Alert.alert(
        '삭제 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    } finally {
      setDeletingId(null);
    }
  };

  const editorCategory =
    editorState.mode === 'edit' ? editorState.category : null;
  const editorDefaultType =
    editorState.mode === 'create' ? editorState.defaultType : 'expense';

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <ThemedText type="title" style={styles.title}>
            예산 관리
          </ThemedText>
          <Pressable
            onPress={() =>
              setEditorState({ mode: 'create', defaultType: 'expense' })
            }
            style={styles.addButton}
          >
            <MaterialIcons name="add" size={24} color={colors.tint} />
          </Pressable>
        </View>

        {isLoading ? (
          <ActivityIndicator style={styles.loader} color={colors.tint} />
        ) : (
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <BudgetSection
              title="지출"
              categories={grouped.expense}
              onAdd={() =>
                setEditorState({ mode: 'create', defaultType: 'expense' })
              }
              onEdit={(category) => setEditorState({ mode: 'edit', category })}
              onDelete={handleDelete}
              deletingId={deletingId}
              isDeleting={isDeleting}
            />

            <BudgetSection
              title="수입"
              categories={grouped.income}
              onAdd={() =>
                setEditorState({ mode: 'create', defaultType: 'income' })
              }
              onEdit={(category) => setEditorState({ mode: 'edit', category })}
              onDelete={handleDelete}
              deletingId={deletingId}
              isDeleting={isDeleting}
            />
          </ScrollView>
        )}

        {isRefetching ? (
          <ActivityIndicator style={styles.refetch} color={colors.tint} />
        ) : null}
      </SafeAreaView>

      <BudgetEditorModal
        visible={editorState.mode !== 'closed'}
        category={editorCategory}
        defaultType={editorDefaultType}
        isSubmitting={isCreating || isUpdating}
        onClose={() => setEditorState({ mode: 'closed' })}
        onSubmit={handleSubmit}
      />
    </ThemedView>
  );
}

function BudgetSection({
  title,
  categories,
  onAdd,
  onEdit,
  onDelete,
  deletingId,
  isDeleting,
}: {
  title: string;
  categories: Category[];
  onAdd: () => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  deletingId: string | null;
  isDeleting: boolean;
}) {
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
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  backButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    fontSize: 22,
  },
  addButton: {
    padding: 4,
  },
  loader: {
    marginTop: 40,
  },
  refetch: {
    marginBottom: 8,
  },
  content: {
    padding: 20,
    gap: 24,
    paddingBottom: 32,
  },
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
