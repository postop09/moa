import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { Colors } from '@/shared/config';
import { useColorScheme, formatAmountInput } from '@/shared/lib';
import { FormField, ThemedText } from '@/shared/ui';
import { useCreateTransaction } from '../model/useCreateTransaction';
import { CategorySelector } from './CategorySelector';
import { DateField } from './DateField';
import { RecurringToggle } from './RecurringToggle';
import { TransactionTypeSelector } from './TransactionTypeSelector';

export const AddTransactionForm = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const {
    name,
    setName,
    amount,
    setAmount,
    type,
    setType,
    categoryId,
    setCategoryId,
    transactionDate,
    setTransactionDate,
    memo,
    setMemo,
    isRecurring,
    setIsRecurring,
    errors,
    categories,
    categoriesLoading,
    isPending,
    handleSubmit,
  } = useCreateTransaction();

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
