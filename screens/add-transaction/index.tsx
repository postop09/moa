import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import {
  TransactionForm,
  type TransactionFormPayload,
  useCreateTransaction,
} from '@/features/transaction';
import { useAuthStore, useHouseholdStore } from '@/shared/model';
import { ThemedText, ThemedView } from '@/shared/ui';

export const AddTransactionPage = () => {
  const router = useRouter();
  const { selectedHouseholdId } = useHouseholdStore();
  const { profile } = useAuthStore();
  const { mutate: create, isPending } = useCreateTransaction();

  const handleSubmit = (payload: TransactionFormPayload) => {
    create(
      {
        householdId: selectedHouseholdId ?? '',
        createdBy: profile?.id ?? '',
        name: payload.name,
        amount: payload.amount,
        type: payload.type,
        categoryId: payload.categoryId,
        transactionDt: payload.transactionDt,
        memo: payload.memo,
        isRecurring: payload.isRecurring,
      },
      {
        onSuccess: () => router.push('/'),
      },
    );
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ThemedText type="title" style={styles.title}>
          거래 입력
        </ThemedText>
        <TransactionForm
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
