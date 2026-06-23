import { supabase } from '@/shared/api';
import { isSupabaseConfigured } from '@/shared/config';

import { mockTransactions } from '../lib/mock-data';
import { getLocalTransactions } from '../lib/local-transactions';
import { getAllTransactionsForMonth } from '../lib/recurring';
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
  name: string;
  type: 'income' | 'expense';
  amount: number;
  memo: string | null;
  transaction_date: string;
  is_recurring: boolean;
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
    name: row.name,
    type: row.type,
    amount: Number(row.amount),
    memo: row.memo,
    transactionDate: row.transaction_date,
    isRecurring: row.is_recurring ?? false,
  };
}

function getDemoTransactions(referenceDate = new Date()) {
  const allTransactions = [...getLocalTransactions(), ...mockTransactions];

  return getAllTransactionsForMonth(allTransactions, referenceDate);
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
    return getDemoTransactions(referenceDate);
  }

  const { start, end } = getMonthRange(referenceDate);

  const [monthlyResult, recurringResult] = await Promise.all([
    supabase
      .from('transactions')
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
      .gte('transaction_date', start)
      .lte('transaction_date', end)
      .order('transaction_date', { ascending: false }),
    supabase
      .from('transactions')
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
      .eq('is_recurring', true)
      .lt('transaction_date', start),
  ]);

  if (monthlyResult.error) {
    throw monthlyResult.error;
  }

  if (recurringResult.error) {
    throw recurringResult.error;
  }

  const allRows = [
    ...(monthlyResult.data ?? []),
    ...(recurringResult.data ?? []),
  ].map((row) => mapTransaction(row as TransactionRow));

  return getAllTransactionsForMonth(allRows, referenceDate);
}

export async function fetchMonthlySummary(referenceDate = new Date()) {
  const transactions = await fetchMonthlyTransactions(referenceDate);
  return calculateMonthlySummary(transactions);
}

export async function fetchDailyExpenses(referenceDate = new Date()) {
  const transactions = await fetchMonthlyTransactions(referenceDate);
  return calculateDailyExpenses(transactions);
}

export async function fetchCategoryExpenses(referenceDate = new Date()) {
  const transactions = await fetchMonthlyTransactions(referenceDate);
  return calculateCategoryExpenses(transactions);
}
