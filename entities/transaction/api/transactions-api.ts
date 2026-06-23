import { supabase } from '@/shared/api';
import { isSupabaseConfigured } from '@/shared/config';

import {
  getMockCategoryExpenses,
  getMockDailyExpenses,
  getMockMonthlySummary,
  mockTransactions,
} from '../lib/mock-data';
import {
  calculateCategoryExpenses,
  calculateDailyExpenses,
  calculateMonthlySummary,
} from '../lib/summary';
import type { Transaction } from '../model/types';

type TransactionRow = {
  id: string;
  user_id: string;
  category_id: string | null;
  type: 'income' | 'expense';
  amount: number;
  memo: string | null;
  transaction_date: string;
  categories: { name: string } | { name: string }[] | null;
};

function getCategoryName(
  categories: TransactionRow['categories'],
): string | undefined {
  if (!categories) return undefined;
  if (Array.isArray(categories)) return categories[0]?.name;
  return categories.name;
}

function mapTransaction(row: TransactionRow): Transaction {
  return {
    id: row.id,
    userId: row.user_id,
    categoryId: row.category_id,
    categoryName: getCategoryName(row.categories),
    type: row.type,
    amount: Number(row.amount),
    memo: row.memo,
    transactionDate: row.transaction_date,
  };
}

function getMonthRange(referenceDate = new Date()) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const start = new Date(year, month, 1).toISOString().slice(0, 10);
  const end = new Date(year, month + 1, 0).toISOString().slice(0, 10);

  return { start, end };
}

export async function fetchMonthlyTransactions(
  referenceDate = new Date(),
): Promise<Transaction[]> {
  if (!isSupabaseConfigured) {
    return mockTransactions;
  }

  const { start, end } = getMonthRange(referenceDate);

  const { data, error } = await supabase
    .from('transactions')
    .select(
      `
      id,
      user_id,
      category_id,
      type,
      amount,
      memo,
      transaction_date,
      categories ( name )
    `,
    )
    .gte('transaction_date', start)
    .lte('transaction_date', end)
    .order('transaction_date', { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => mapTransaction(row as TransactionRow));
}

export async function fetchMonthlySummary(referenceDate = new Date()) {
  const transactions = await fetchMonthlyTransactions(referenceDate);

  if (!isSupabaseConfigured) {
    return getMockMonthlySummary();
  }

  return calculateMonthlySummary(transactions);
}

export async function fetchDailyExpenses(referenceDate = new Date()) {
  const transactions = await fetchMonthlyTransactions(referenceDate);

  if (!isSupabaseConfigured) {
    return getMockDailyExpenses();
  }

  return calculateDailyExpenses(transactions);
}

export async function fetchCategoryExpenses(referenceDate = new Date()) {
  const transactions = await fetchMonthlyTransactions(referenceDate);

  if (!isSupabaseConfigured) {
    return getMockCategoryExpenses();
  }

  return calculateCategoryExpenses(transactions);
}
