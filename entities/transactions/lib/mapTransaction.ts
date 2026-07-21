import type { Transaction } from '../model/transaction';
import { isTransactionType } from '../model/transactionType';

type TransactionRow = {
  id: string;
  householdId: string;
  createdBy: string;
  categoryId?: number | null;
  name?: string | null;
  type?: string | null;
  amount?: number | null;
  memo?: string | null;
  transactionDt?: string | null;
  createdDt: string;
  updatedDt: string;
  isRecurring?: boolean | null;
  categories?: { name: string } | null;
};

const toDate = (value?: string | null): Date | undefined => {
  if (!value) {
    return undefined;
  }

  return new Date(value);
};

export const mapTransaction = (row: TransactionRow): Transaction => {
  return {
    id: row.id,
    householdId: row.householdId,
    createdBy: row.createdBy,
    categoryId: row.categoryId ?? undefined,
    categoryName: row.categories?.name ?? undefined,
    name: row.name ?? undefined,
    type: isTransactionType(row.type) ? row.type : undefined,
    amount: row.amount ?? undefined,
    memo: row.memo ?? undefined,
    transactionDt: toDate(row.transactionDt),
    createdDt: new Date(row.createdDt),
    updatedDt: new Date(row.updatedDt),
    isRecurring: row.isRecurring ?? undefined,
  };
};
