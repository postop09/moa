import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCreateCategory, useGetCategories } from '@/features/category';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { useHouseholdStore } from '@/entities/households';
import { ThemedText, ThemedView } from '@/shared/ui';

import { CategoryEditModal } from './ui/CategoryEdit.modal';
import { CategoryList } from './ui/CategoryList';

export const CategoryManagementPage = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { selectedHouseholdId } = useHouseholdStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { categories, isLoading, isRefetching } = useGetCategories(
    selectedHouseholdId ?? '',
  );
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <ThemedText type="title" style={styles.title}>
            카테고리 관리
          </ThemedText>
          <Pressable
            onPress={() => setIsCreateOpen(true)}
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
            <CategoryList title="지출" categories={categories.expense} />
            <CategoryList title="수입" categories={categories.income} />
          </ScrollView>
        )}

        {isRefetching ? (
          <ActivityIndicator style={styles.refetch} color={colors.tint} />
        ) : null}
      </SafeAreaView>

      <CategoryEditModal
        visible={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        isLoading={isCreating}
        onSubmit={(payload) =>
          createCategory(
            {
              householdId: selectedHouseholdId ?? '',
              name: payload.name,
              budget: payload.budget,
              type: payload.type,
            },
            {
              onSuccess: () => setIsCreateOpen(false),
            },
          )
        }
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
