import type { Category, CreateCategoryReq } from '@/entities/category';
import { TransactionType, useHouseholdStore } from '@/shared/model';
import { useGetCategories } from './useGetCategories';
import { useCreateCategory } from './useCreateCategory';
import { useDeleteCategory } from './useDeleteCategory';
import { useUpdateCategory } from './useUpdateCategory';
import { useMemo, useState } from 'react';
import { Alert } from 'react-native';

type EditorState =
  | { mode: 'closed' }
  | { mode: 'create'; defaultType: TransactionType }
  | { mode: 'edit'; category: Category };

export const useBudgetManagement = () => {
  const { selectedHouseholdId } = useHouseholdStore();
  const {
    data: categories = [],
    isLoading,
    isRefetching,
  } = useGetCategories(selectedHouseholdId ?? '');
  const { mutateAsync: createCategory, isPending: isCreating } =
    useCreateCategory();
  const { mutateAsync: updateCategory, isPending: isUpdating } =
    useUpdateCategory();
  const { mutateAsync: deleteCategory, isPending: isDeleting } =
    useDeleteCategory();

  const [editorState, setEditorState] = useState<EditorState>({
    mode: 'closed',
  });
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const grouped = useMemo(() => {
    return {
      expense: categories.filter((category) => category.type === 'expense'),
      income: categories.filter((category) => category.type === 'income'),
    };
  }, [categories]);

  const handleSubmit = async (payload: CreateCategoryReq) => {
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
      console.error(error);
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

  return {
    grouped,
    isLoading,
    isRefetching,
    isCreating,
    isUpdating,
    isDeleting,
    deletingId,
    editorState,
    editorCategory,
    editorDefaultType,
    setEditorState,
    handleSubmit,
    handleDelete,
  };
};
