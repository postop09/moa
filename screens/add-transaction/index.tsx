import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useGetCategories } from '@/features/category';
import {
  TransactionForm,
  type TransactionFormPayload,
  useCreateTransactionSubmit,
} from '@/features/transaction';
import { useHouseholdStore } from '@/shared/model';
import { ThemedText, ThemedView } from '@/shared/ui';

export const AddTransactionPage = () => {
  const router = useRouter();
  const { selectedHouseholdId } = useHouseholdStore();
  const { submit, isPending } = useCreateTransactionSubmit();
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategories(selectedHouseholdId ?? '');

  const handleSubmit = (payload: TransactionFormPayload) => {
    submit(payload, {
      onSuccess: () => router.push('/'),
    });
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ThemedText type="title" style={styles.title}>
          거래 입력
        </ThemedText>
        <TransactionForm
          categories={categories}
          categoriesLoading={categoriesLoading}
          isLoading={isPending}
          getSubmitLabel={(type) =>
            type === 'expense' ? '지출 저장' : '수입 저장'
          }
          onSubmit={handleSubmit}
        />
      </SafeAreaView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 28,
  },
});
