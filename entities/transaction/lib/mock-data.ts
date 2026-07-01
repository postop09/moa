import type { CategoryExpense } from '../model/categoryExpense';
import type { DailyExpense } from '../model/dailyExpense';
import type { MonthlySummary } from '../model/monthlySummary';
import type { Transaction } from '../model/transaction';
const today = new Date();
const daysAgo = (days: number): string => {
  const date = new Date(today);
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
};
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: 'demo',
    categoryId: 'c1',
    categoryName: '급여',
    name: '3월 급여',
    type: 'income',
    amount: 3200000,
    memo: '3월 급여',
    isRecurring: false,
    transactionDate: daysAgo(2),
  },
  {
    id: '2',
    userId: 'demo',
    categoryId: 'c2',
    categoryName: '식비',
    name: '점심 식사',
    type: 'expense',
    amount: 12500,
    memo: '점심',
    isRecurring: false,
    transactionDate: daysAgo(0),
  },
  {
    id: '3',
    userId: 'demo',
    categoryId: 'c3',
    categoryName: '교통',
    name: '지하철',
    type: 'expense',
    amount: 1370,
    memo: '지하철',
    isRecurring: false,
    transactionDate: daysAgo(0),
  },
  {
    id: '4',
    userId: 'demo',
    categoryId: 'c4',
    categoryName: '쇼핑',
    name: '생필품',
    type: 'expense',
    amount: 89000,
    memo: '생필품',
    isRecurring: false,
    transactionDate: daysAgo(1),
  },
  {
    id: '5',
    userId: 'demo',
    categoryId: 'c2',
    categoryName: '식비',
    name: '저녁 회식',
    type: 'expense',
    amount: 45000,
    memo: '저녁 회식',
    isRecurring: false,
    transactionDate: daysAgo(1),
  },
  {
    id: '6',
    userId: 'demo',
    categoryId: 'c5',
    categoryName: '주거',
    name: '월세',
    type: 'expense',
    amount: 550000,
    memo: '월세',
    isRecurring: true,
    transactionDate: daysAgo(3),
  },
  {
    id: '7',
    userId: 'demo',
    categoryId: 'c2',
    categoryName: '식비',
    name: '아침 식사',
    type: 'expense',
    amount: 9800,
    memo: '아침',
    isRecurring: false,
    transactionDate: daysAgo(2),
  },
  {
    id: '8',
    userId: 'demo',
    categoryId: 'c6',
    categoryName: '부수입',
    name: '프리랜스',
    type: 'income',
    amount: 150000,
    memo: '프리랜스',
    isRecurring: false,
    transactionDate: daysAgo(4),
  },
  {
    id: '9',
    userId: 'demo',
    categoryId: 'c4',
    categoryName: '쇼핑',
    name: '의류',
    type: 'expense',
    amount: 32000,
    memo: '의류',
    isRecurring: false,
    transactionDate: daysAgo(5),
  },
  {
    id: '10',
    userId: 'demo',
    categoryId: 'c2',
    categoryName: '식비',
    name: '커피·간식',
    type: 'expense',
    amount: 15600,
    memo: '커피·간식',
    isRecurring: false,
    transactionDate: daysAgo(6),
  },
];
export const getMockMonthlySummary = (): MonthlySummary => {
  const income = mockTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = mockTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
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
    const dateKey = date.toISOString().slice(0, 10);
    const label = dayLabels[date.getDay()];
    const value = mockTransactions
      .filter((t) => t.type === 'expense' && t.transactionDate === dateKey)
      .reduce((sum, t) => sum + t.amount, 0);
    return { label, value };
  });
};
export const getMockCategoryExpenses = (): CategoryExpense[] => {
  const categoryMap = new Map<string, number>();
  mockTransactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const name = t.categoryName ?? '기타';
      categoryMap.set(name, (categoryMap.get(name) ?? 0) + t.amount);
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
