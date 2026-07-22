import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useGetCategories } from '@/features/category';
import {
  dateFromYearMonth,
  TransactionForm,
  type TransactionFormPayload,
  useCreateTransactionSubmit,
  useGetTransaction,
  useUpdateTransaction,
} from '@/features/transaction';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { useHouseholdStore } from '@/entities/households';
import { ThemedText, ThemedView } from '@/shared/ui';

export const TransactionFormPage = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { selectedHouseholdId } = useHouseholdStore();
  const params = useLocalSearchParams<{ id?: string; yearMonth?: string }>();
  const id = typeof params.id === 'string' ? params.id : undefined;
  const yearMonth =
    typeof params.yearMonth === 'string' ? params.yearMonth : undefined;
  const isEditing = !!id;

  const { data: transaction, isLoading: isLoadingTransaction } =
    useGetTransaction(id);
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategories(selectedHouseholdId ?? '');
  const { submit: create, isPending: isCreating } =
    useCreateTransactionSubmit();
  const { mutate: update, isPending: isUpdating } = useUpdateTransaction();

  const handleSubmit = (payload: TransactionFormPayload) => {
    if (isEditing && payload.id) {
      update(
        {
          id: payload.id,
          name: payload.name,
          amount: payload.amount,
          type: payload.type,
          categoryId: payload.categoryId,
          transactionDt: payload.transactionDt,
          memo: payload.memo,
          isRecurring: payload.isRecurring,
        },
        {
          onSuccess: () => router.back(),
        },
      );
      return;
    }

    create(payload, {
      onSuccess: () => router.back(),
    });
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <ThemedText type="title" style={styles.title}>
            {isEditing ? '거래 수정' : '거래 추가'}
          </ThemedText>
        </View>

        {isEditing && isLoadingTransaction ? (
          <ActivityIndicator style={styles.loader} color={colors.tint} />
        ) : (
          <View style={styles.form}>
            <TransactionForm
              key={transaction?.id ?? yearMonth ?? 'create'}
              categories={categories}
              categoriesLoading={categoriesLoading}
              transaction={transaction}
              initialDate={yearMonth ? dateFromYearMonth(yearMonth) : undefined}
              isLoading={isCreating || isUpdating}
              onSubmit={handleSubmit}
            />
          </View>
        )}
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
  form: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loader: {
    marginTop: 40,
  },
});
