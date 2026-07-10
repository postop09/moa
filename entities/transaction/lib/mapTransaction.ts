import type { CreateTransactionReq } from '../model/createTransactionReq';
import type { Transaction } from '../model/transaction';
import type { UpdateTransactionReq } from '../model/updateTransactionReq';

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
    name: row.name ?? undefined,
    type: (row.type as Transaction['type']) ?? undefined,
    amount: row.amount ?? undefined,
    memo: row.memo ?? undefined,
    transactionDt: toDate(row.transactionDt),
    createdDt: new Date(row.createdDt),
    updatedDt: new Date(row.updatedDt),
    isRecurring: row.isRecurring ?? undefined,
  };
};

export const toTransactionInsertRow = (payload: CreateTransactionReq) => {
  return {
    householdId: payload.householdId,
    createdBy: payload.createdBy,
    categoryId: payload.categoryId,
    name: payload.name,
    type: payload.type,
    amount: payload.amount,
    memo: payload.memo,
    transactionDt: payload.transactionDt?.toISOString(),
    isRecurring: payload.isRecurring,
  };
};

export const toTransactionUpdateRow = (
  payload: Omit<UpdateTransactionReq, 'id'>,
) => {
  return {
    categoryId: payload.categoryId,
    name: payload.name,
    type: payload.type,
    amount: payload.amount,
    memo: payload.memo,
    transactionDt: payload.transactionDt?.toISOString(),
    isRecurring: payload.isRecurring,
  };
};
