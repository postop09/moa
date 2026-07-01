import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { useBudgetManagement } from './model/useBudgetManagement';
import { BudgetEditorModal } from './ui/BudgetEditorModal';
import { BudgetSection } from './ui/BudgetSection';
export const BudgetManagementPage = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const {
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
  } = useBudgetManagement();
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
};
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
});
