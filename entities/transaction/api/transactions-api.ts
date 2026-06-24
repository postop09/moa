import { fetchCategories } from '@/entities/category';

import { mockTransactions } from '../lib/mock-data';
import {
  addLocalTransaction,
  getLocalTransactions,
} from '../lib/local-transactions';
import { getAllTransactionsForMonth } from '../lib/recurring';
import {
  calculateCategoryExpenses,
  calculateDailyExpenses,
  calculateMonthlySummary,
} from '../lib/summary';
import type { CreateTransactionInput, Transaction } from '../model/types';

function getDemoTransactions(referenceDate = new Date()) {
  const allTransactions = [...getLocalTransactions(), ...mockTransactions];

  return getAllTransactionsForMonth(allTransactions, referenceDate);
}

export async function fetchMonthlyTransactions(
  referenceDate = new Date(),
): Promise<Transaction[]> {
  return getDemoTransactions(referenceDate);
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

export async function createTransaction(
  input: CreateTransactionInput,
): Promise<Transaction> {
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
