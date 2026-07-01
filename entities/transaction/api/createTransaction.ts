import { fetchCategories } from '@/entities/category';
import { addLocalTransaction } from '../lib/local-transactions';
import type { Transaction } from '../model/transaction';
import type { CreateTransactionReq } from '../model/createTransactionReq';
export const createTransaction = async (
  payload: CreateTransactionReq,
): Promise<Transaction> => {
  const categories = await fetchCategories(payload.type);
  const category = categories.find((item) => item.id === payload.categoryId);
  const transaction: Transaction = {
    id: `local-${Date.now()}`,
    userId: 'demo',
    categoryId: payload.categoryId,
    categoryName: category?.name,
    name: payload.name,
    type: payload.type,
    amount: payload.amount,
    memo: payload.memo,
    transactionDate: payload.transactionDate,
    isRecurring: payload.isRecurring,
  };
  addLocalTransaction(transaction);
  return transaction;
};
