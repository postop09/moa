import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  type TransactionType,
  useCreateTransaction,
} from '@/entities/transaction';
import { Colors } from '@/shared/config';
import {
  useColorScheme,
  formatAmountInput,
  parseAmountInput,
} from '@/shared/lib';
import { FormField, ThemedText } from '@/shared/ui';
import { CategorySelector } from './CategorySelector';
import { DateField } from './DateField';
import { RecurringToggle } from './RecurringToggle';
import { TransactionTypeSelector } from './TransactionTypeSelector';
import { useGetCategories } from '@/screens/category-management/model/useGetCategories';
import { useAuthStore, useHouseholdStore } from '@/shared/model';

const INITIAL_DATE = new Date();

export const AddTransactionForm = () => {
  const router = useRouter();
  const { selectedHouseholdId } = useHouseholdStore();
  const { profile } = useAuthStore();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [categoryId, setCategoryId] = useState<number>();
  const [transactionDate, setTransactionDate] = useState(INITIAL_DATE);
  const [memo, setMemo] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategories(selectedHouseholdId ?? '', type);
  const { mutate, isPending } = useCreateTransaction();

  useEffect(() => {
    if (!categories.length) {
      return;
    }
    const hasSelectedCategory = categories.some(
      (category: { id: number }) => category.id === categoryId,
    );
    if (!hasSelectedCategory) {
      setCategoryId(categories[0].id);
    }
  }, [categories, categoryId, type]);

  const resetForm = () => {
    setName('');
    setAmount('');
    setType('expense');
    setCategoryId(undefined);
    setTransactionDate(new Date());
    setMemo('');
    setIsRecurring(false);
    setErrors({});
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    const parsedAmount = parseAmountInput(amount);
    if (!name.trim()) {
      nextErrors.name = '이름을 입력해주세요.';
    }
    if (!parsedAmount) {
      nextErrors.amount = '금액을 입력해주세요.';
    }
    if (!categoryId) {
      nextErrors.categoryId = '카테고리를 선택해주세요.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }
    mutate(
      {
        householdId: selectedHouseholdId ?? '',
        name: name.trim(),
        amount: parseAmountInput(amount),
        categoryId,
        type,
        transactionDt: transactionDate,
        memo: memo,
        isRecurring,
        createdBy: profile?.id ?? '',
      },
      {
        onSuccess: () => {
          resetForm();
          router.push('/');
        },
      },
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TransactionTypeSelector value={type} onChange={setType} />

        <FormField
          label="이름"
          value={name}
          onChangeText={setName}
          placeholder="예: 점심 식사"
          error={errors.name}
        />

        <FormField
          label="금액"
          value={amount}
          onChangeText={(value) => setAmount(formatAmountInput(value))}
          placeholder="0"
          keyboardType="number-pad"
          error={errors.amount}
        />

        <CategorySelector
          categories={categories}
          value={categoryId ?? 0}
          onChange={setCategoryId}
          isLoading={categoriesLoading}
        />
        {errors.categoryId ? (
          <ThemedText style={[styles.error, { color: colors.expense }]}>
            {errors.categoryId}
          </ThemedText>
        ) : null}

        <DateField value={transactionDate} onChange={setTransactionDate} />

        <RecurringToggle value={isRecurring} onChange={setIsRecurring} />

        <FormField
          label="설명"
          value={memo}
          onChangeText={setMemo}
          placeholder="메모를 입력하세요 (선택)"
          multiline
          numberOfLines={4}
          style={styles.memoInput}
          textAlignVertical="top"
        />

        <Pressable
          onPress={handleSubmit}
          disabled={isPending}
          style={[
            styles.submitButton,
            {
              backgroundColor:
                type === 'expense' ? colors.expense : colors.income,
              opacity: isPending ? 0.7 : 1,
            },
          ]}
        >
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.submitText}>
              {type === 'expense' ? '지출 저장' : '수입 저장'}
            </ThemedText>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    gap: 20,
    paddingBottom: 32,
  },
  memoInput: {
    minHeight: 110,
    paddingTop: 12,
  },
  error: {
    fontSize: 13,
    marginTop: -12,
  },
  submitButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
