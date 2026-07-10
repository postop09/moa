import type { GetTransactionsReq } from '@/entities/transaction';

const getMonthKey = (date = new Date()) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
};

export const transactionQueryKeys = {
  all: ['transactions'] as const,
  list: (payload: GetTransactionsReq) => ['transactions', payload] as const,
  monthly: (householdId: string, date = new Date()) =>
    ['transactions', householdId, getMonthKey(date)] as const,
  detail: (id?: string) => ['transaction', id] as const,
  monthlySummary: (householdId: string, date = new Date()) =>
    ['monthly-summary', householdId, getMonthKey(date)] as const,
  dailyExpenses: (householdId: string, date = new Date()) =>
    ['daily-expenses', householdId, getMonthKey(date)] as const,
  categoryExpenses: (householdId: string, date = new Date()) =>
    ['category-expenses', householdId, getMonthKey(date)] as const,
};
