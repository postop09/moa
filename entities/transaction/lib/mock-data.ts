import type { CategoryExpense } from '../model/categoryExpense';
import type { DailyExpense } from '../model/dailyExpense';
import type { MonthlySummary } from '../model/monthlySummary';
import type { Transaction } from '../model/transaction';
import { toTransactionDateKey } from './transactionDate';

const today = new Date();
const now = new Date();

const daysAgo = (days: number): Date => {
  const date = new Date(today);
  date.setDate(date.getDate() - days);

  return date;
};

const createMockTransaction = (
  transaction: Omit<
    Transaction,
    'householdId' | 'createdBy' | 'createdDt' | 'updatedDt'
  >,
): Transaction => {
  return {
    ...transaction,
    householdId: 'household-demo',
    createdBy: 'demo',
    createdDt: now,
    updatedDt: now,
  };
};

export const mockTransactions: Transaction[] = [
  createMockTransaction({
    id: '1',
    categoryId: 1,
    name: '3월 급여',
    type: 'income',
    amount: 3200000,
    memo: '3월 급여',
    isRecurring: false,
    transactionDt: daysAgo(2),
  }),
  createMockTransaction({
    id: '2',
    categoryId: 2,
    name: '점심 식사',
    type: 'expense',
    amount: 12500,
    memo: '점심',
    isRecurring: false,
    transactionDt: daysAgo(0),
  }),
  createMockTransaction({
    id: '3',
    categoryId: 3,
    name: '지하철',
    type: 'expense',
    amount: 1370,
    memo: '지하철',
    isRecurring: false,
    transactionDt: daysAgo(0),
  }),
  createMockTransaction({
    id: '4',
    categoryId: 4,
    name: '생필품',
    type: 'expense',
    amount: 89000,
    memo: '생필품',
    isRecurring: false,
    transactionDt: daysAgo(1),
  }),
  createMockTransaction({
    id: '5',
    categoryId: 2,
    name: '저녁 회식',
    type: 'expense',
    amount: 45000,
    memo: '저녁 회식',
    isRecurring: false,
    transactionDt: daysAgo(1),
  }),
  createMockTransaction({
    id: '6',
    categoryId: 5,
    name: '월세',
    type: 'expense',
    amount: 550000,
    memo: '월세',
    isRecurring: true,
    transactionDt: daysAgo(3),
  }),
  createMockTransaction({
    id: '7',
    categoryId: 2,
    name: '아침 식사',
    type: 'expense',
    amount: 9800,
    memo: '아침',
    isRecurring: false,
    transactionDt: daysAgo(2),
  }),
  createMockTransaction({
    id: '8',
    categoryId: 6,
    name: '프리랜스',
    type: 'income',
    amount: 150000,
    memo: '프리랜스',
    isRecurring: false,
    transactionDt: daysAgo(4),
  }),
  createMockTransaction({
    id: '9',
    categoryId: 4,
    name: '의류',
    type: 'expense',
    amount: 32000,
    memo: '의류',
    isRecurring: false,
    transactionDt: daysAgo(5),
  }),
  createMockTransaction({
    id: '10',
    categoryId: 2,
    name: '커피·간식',
    type: 'expense',
    amount: 15600,
    memo: '커피·간식',
    isRecurring: false,
    transactionDt: daysAgo(6),
  }),
];

export const getMockMonthlySummary = (): MonthlySummary => {
  const income = mockTransactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + (transaction.amount ?? 0), 0);
  const expense = mockTransactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + (transaction.amount ?? 0), 0);

  return {
    income,
    expense,
    balance: income - expense,
  };
};

export const getMockDailyExpenses = (): DailyExpense[] => {
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

  return Array.from({ length: 7 }, (_, index) => {
    const days = 6 - index;
    const date = new Date(today);
    date.setDate(date.getDate() - days);
    const dateKey = toTransactionDateKey(date);
    const label = dayLabels[date.getDay()];
    const value = mockTransactions
      .filter(
        (transaction) =>
          transaction.type === 'expense' &&
          toTransactionDateKey(transaction.transactionDt) === dateKey,
      )
      .reduce((sum, transaction) => sum + (transaction.amount ?? 0), 0);

    return { label, value };
  });
};

export const getMockCategoryExpenses = (): CategoryExpense[] => {
  const categoryMap = new Map<string, number>();

  mockTransactions
    .filter((transaction) => transaction.type === 'expense')
    .forEach((transaction) => {
      const name =
        transaction.categoryId != null
          ? `카테고리 ${transaction.categoryId}`
          : '기타';
      categoryMap.set(
        name,
        (categoryMap.get(name) ?? 0) + (transaction.amount ?? 0),
      );
    });

  const colors = [
    '#EF4444',
    '#F97316',
    '#EAB308',
    '#8B5CF6',
    '#06B6D4',
    '#64748B',
  ];

  return Array.from(categoryMap.entries()).map(([name, value], index) => ({
    name,
    value,
    color: colors[index % colors.length],
  }));
};
