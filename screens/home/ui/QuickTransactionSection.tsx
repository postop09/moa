import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { useGetCategories } from '@/features/category';
import {
  CategorySelector,
  TransactionTypeSelector,
  useCreateTransactionSubmit,
} from '@/features/transaction';
import { Colors } from '@/shared/config';
import {
  formatAmountInput,
  parseAmountInput,
  useColorScheme,
} from '@/shared/lib';
import type { TransactionType } from '@/entities/transactions';
import { useHouseholdStore } from '@/shared/model';
import { FormField, ThemedText, ThemedView } from '@/shared/ui';

export const QuickTransactionSection = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { selectedHouseholdId } = useHouseholdStore();
  const { submit, isPending } = useCreateTransactionSubmit();

  const [type, setType] = useState<TransactionType>('expense');
  const [categoryId, setCategoryId] = useState<number>();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategories(selectedHouseholdId ?? '', type);

  useEffect(() => {
    if (!categories.length) {
      setCategoryId(undefined);
      return;
    }

    const hasSelected = categories.some(
      (category) => category.id === categoryId,
    );
    if (!hasSelected) {
      setCategoryId(categories[0].id);
    }
  }, [categories, categoryId]);

  const resetForm = () => {
    setAmount('');
    setError('');
    setType('expense');
  };

  const handleSubmit = () => {
    const parsedAmount = parseAmountInput(amount);

    if (!parsedAmount) {
      setError('금액을 입력해주세요.');
      return;
    }
    if (!categoryId) {
      setError('카테고리를 선택해주세요.');
      return;
    }

    setError('');
    const created = submit(
      {
        amount: parsedAmount,
        type,
        categoryId,
        transactionDt: new Date(),
      },
      {
        onSuccess: resetForm,
      },
    );

    if (!created) {
      setError('가구 또는 계정 정보가 없습니다.');
    }
  };

  return (
    <ThemedView
      style={[styles.card, { borderColor: colors.border }]}
      lightColor={colors.card}
      darkColor={colors.card}
    >
      <ThemedText style={styles.title}>빠른 입력</ThemedText>

      <View style={styles.fields}>
        <TransactionTypeSelector value={type} onChange={setType} />

        <CategorySelector
          categories={categories}
          value={categoryId}
          onChange={setCategoryId}
          isLoading={categoriesLoading}
        />

        <FormField
          label="금액"
          value={amount}
          onChangeText={(value) => {
            setAmount(formatAmountInput(value));
            if (error) {
              setError('');
            }
          }}
          placeholder="0"
          keyboardType="number-pad"
          error={error}
        />
      </View>

      <Pressable
        onPress={handleSubmit}
        disabled={isPending}
        style={({ pressed }) => [
          styles.submitButton,
          {
            backgroundColor:
              type === 'expense' ? colors.expense : colors.income,
            opacity: isPending || pressed ? 0.7 : 1,
          },
        ]}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemedText style={styles.submitText}>
            {type === 'expense' ? '지출 추가' : '수입 추가'}
          </ThemedText>
        )}
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  fields: {
    gap: 16,
  },
  submitButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
