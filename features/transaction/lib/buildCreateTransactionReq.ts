import type {
  CreateTransactionReq,
  TransactionType,
} from '@/entities/transactions';

export type CreateTransactionInput = {
  name?: string;
  amount: number;
  type: TransactionType;
  categoryId?: number;
  transactionDt: Date;
  memo?: string;
  isRecurring?: boolean;
};

type CreateTransactionContext = {
  householdId: string;
  createdBy: string;
};

export const buildCreateTransactionReq = (
  payload: CreateTransactionInput,
  context: CreateTransactionContext,
): CreateTransactionReq => ({
  householdId: context.householdId,
  createdBy: context.createdBy,
  name: payload.name,
  amount: payload.amount,
  type: payload.type,
  categoryId: payload.categoryId,
  transactionDt: payload.transactionDt,
  memo: payload.memo,
  isRecurring: payload.isRecurring,
});
