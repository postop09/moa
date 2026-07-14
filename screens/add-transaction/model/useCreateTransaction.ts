import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { createTransaction } from '@/entities/transaction';
import { useGetCategories } from '@/features/category';
import { invalidateTransactionQueries } from '@/features/transaction';
import { parseAmountInput } from '@/shared/lib';
import {
  TransactionType,
  useAuthStore,
  useHouseholdStore,
} from '@/shared/model';

const INITIAL_DATE = new Date();

export const useCreateTransaction = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [categoryId, setCategoryId] = useState<number>();
  const [transactionDate, setTransactionDate] = useState(INITIAL_DATE);
  const [memo, setMemo] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { selectedHouseholdId } = useHouseholdStore();
  const { profile } = useAuthStore();
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategories(selectedHouseholdId ?? '', type);

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

  const { mutate, isPending } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      invalidateTransactionQueries(queryClient);
      resetForm();
      router.push('/');
    },
    onError: (error) => {
      console.log(error);
      Alert.alert(
        '생성 실패',
        error instanceof Error ? error.message : '다시 시도해주세요.',
      );
    },
  });

  useEffect(() => {
    if (!categories.length) {
      return;
    }

    const hasSelectedCategory = categories.some(
      (category) => category.id === categoryId,
    );

    if (!hasSelectedCategory) {
      setCategoryId(categories[0].id);
    }
  }, [categories, categoryId, type]);

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

    mutate({
      householdId: selectedHouseholdId ?? '',
      name: name.trim(),
      amount: parseAmountInput(amount),
      categoryId,
      type,
      transactionDt: transactionDate,
      memo,
      isRecurring,
      createdBy: profile?.id ?? '',
    });
  };

  return {
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
  };
};
