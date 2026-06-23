import { fetchCategories } from '@/entities/category';
import { supabase } from '@/shared/api';
import { isSupabaseConfigured } from '@/shared/config';

import { addLocalTransaction } from '../lib/local-transactions';
import type { CreateTransactionInput, Transaction } from '../model/types';

export async function createTransaction(
  input: CreateTransactionInput,
): Promise<Transaction> {
  if (!isSupabaseConfigured) {
    const categories = await fetchCategories(input.type);
    const category = categories.find((item) => item.id === input.categoryId);

    const transaction: Transaction = {
      id: `local-${Date.now()}`,
      userId: 'demo',
      categoryId: input.categoryId,
      categoryName: category?.name,
      name: input.name,
      type: input.type,
      amount: input.amount,
      memo: input.memo,
      transactionDate: input.transactionDate,
      isRecurring: input.isRecurring,
    };

    addLocalTransaction(transaction);
    return transaction;
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert({
      user_id: user.id,
      category_id: input.categoryId,
      name: input.name,
      type: input.type,
      amount: input.amount,
      memo: input.memo,
      transaction_date: input.transactionDate,
      is_recurring: input.isRecurring,
    })
    .select(
      `
      id,
      user_id,
      category_id,
      name,
      type,
      amount,
      memo,
      transaction_date,
      is_recurring,
      categories ( name )
    `,
    )
    .single();

  if (error) {
    throw error;
  }

  const categories = data.categories as
    | { name: string }
    | { name: string }[]
    | null;
  const categoryName = Array.isArray(categories)
    ? categories[0]?.name
    : categories?.name;

  return {
    id: data.id,
    userId: data.user_id,
    categoryId: data.category_id,
    categoryName,
    name: data.name,
    type: data.type,
    amount: Number(data.amount),
    memo: data.memo,
    transactionDate: data.transaction_date,
    isRecurring: data.is_recurring ?? false,
  };
}
