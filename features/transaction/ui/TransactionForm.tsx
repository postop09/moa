import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

import type { Category } from '@/entities/category';
import type { Transaction } from '@/entities/transaction';
import type { TransactionType } from '@/shared/model';
import {
  formatAmountInput,
  parseAmountInput,
  useColorScheme,
} from '@/shared/lib';
import { Colors } from '@/shared/config';
import { FormField, ThemedText } from '@/shared/ui';

import { CategorySelector } from './CategorySelector';
import { DateField } from './DateField';
import { RecurringToggle } from './RecurringToggle';
import { TransactionTypeSelector } from './TransactionTypeSelector';

export type TransactionFormPayload = {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  categoryId?: number;
  transactionDt: Date;
  memo?: string;
  isRecurring?: boolean;
};

type Props = {
  categories: Category[];
  categoriesLoading?: boolean;
  transaction?: Transaction | null;
  initialDate?: Date;
  isLoading?: boolean;
  getSubmitLabel?: (type: TransactionType, isEditing: boolean) => string;
  onSubmit: (payload: TransactionFormPayload) => void;
};

export const TransactionForm = ({
  categories,
  categoriesLoading,
  transaction,
  initialDate,
  isLoading,
  getSubmitLabel,
  onSubmit,
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const isEditing = !!transaction;

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [categoryId, setCategoryId] = useState<number>();
  const [transactionDate, setTransactionDate] = useState(
    initialDate ?? new Date(),
  );
  const [memo, setMemo] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [initialized, setInitialized] = useState(false);

  const filteredCategories = useMemo(
    () => categories.filter((category) => category.type === type),
    [categories, type],
  );

  useEffect(() => {
    if (initialized) {
      return;
    }

    if (transaction) {
      setName(transaction.name ?? '');
      setAmount(
        transaction.amount != null
          ? formatAmountInput(String(transaction.amount))
          : '',
      );
      setType(transaction.type ?? 'expense');
      setCategoryId(transaction.categoryId);
      setTransactionDate(transaction.transactionDt ?? new Date());
      setMemo(transaction.memo ?? '');
      setIsRecurring(transaction.isRecurring ?? false);
      setInitialized(true);
      return;
    }

    setTransactionDate(initialDate ?? new Date());
    setInitialized(true);
  }, [transaction, initialDate, initialized]);

  useEffect(() => {
    if (!filteredCategories.length) {
      return;
    }
    if (!isEditing) {
      setCategoryId(filteredCategories[0].id);
    }
  }, [filteredCategories, isEditing]);

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {};
    const parsedAmount = parseAmountInput(amount);

    if (!categoryId) {
      nextErrors.categoryId = '카테고리를 선택해주세요.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit({
      id: transaction?.id,
      name: name.trim(),
      amount: parsedAmount,
      type,
      categoryId,
      transactionDt: transactionDate,
      memo: memo.trim() || undefined,
      isRecurring,
    });
  };

  const submitLabel =
    getSubmitLabel?.(type, isEditing) ?? (isEditing ? '저장' : '추가');

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <TransactionTypeSelector value={type} onChange={setType} />
        <DateField value={transactionDate} onChange={setTransactionDate} />
        <RecurringToggle value={isRecurring} onChange={setIsRecurring} />
        <CategorySelector
          categories={filteredCategories}
          value={categoryId}
          onChange={setCategoryId}
          isLoading={categoriesLoading}
          error={errors.categoryId}
        />
        <FormField
          label="금액"
          value={amount}
          onChangeText={(value) => setAmount(formatAmountInput(value))}
          placeholder="0"
          keyboardType="number-pad"
          error={errors.amount}
        />

        <FormField
          label="이름"
          value={name}
          onChangeText={setName}
          placeholder="이름을 입력하세요 (선택)"
          error={errors.name}
        />

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
          disabled={isLoading}
          style={[
            styles.submitButton,
            {
              backgroundColor:
                type === 'expense' ? colors.expense : colors.income,
              opacity: isLoading ? 0.7 : 1,
            },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.submitText}>{submitLabel}</ThemedText>
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
