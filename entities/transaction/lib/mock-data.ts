import type {
  CategoryExpense,
  DailyExpense,
  MonthlySummary,
  Transaction,
} from '../model/types';

const today = new Date();

function daysAgo(days: number): string {
  const date = new Date(today);
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
}

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: 'demo',
    categoryId: 'c1',
    categoryName: '급여',
    type: 'income',
    amount: 3200000,
    memo: '3월 급여',
    transactionDate: daysAgo(2),
  },
  {
    id: '2',
    userId: 'demo',
    categoryId: 'c2',
    categoryName: '식비',
    type: 'expense',
    amount: 12500,
    memo: '점심',
    transactionDate: daysAgo(0),
  },
  {
    id: '3',
    userId: 'demo',
    categoryId: 'c3',
    categoryName: '교통',
    type: 'expense',
    amount: 1370,
    memo: '지하철',
    transactionDate: daysAgo(0),
  },
  {
    id: '4',
    userId: 'demo',
    categoryId: 'c4',
    categoryName: '쇼핑',
    type: 'expense',
    amount: 89000,
    memo: '생필품',
    transactionDate: daysAgo(1),
  },
  {
    id: '5',
    userId: 'demo',
    categoryId: 'c2',
    categoryName: '식비',
    type: 'expense',
    amount: 45000,
    memo: '저녁 회식',
    transactionDate: daysAgo(1),
  },
  {
    id: '6',
    userId: 'demo',
    categoryId: 'c5',
    categoryName: '주거',
    type: 'expense',
    amount: 550000,
    memo: '월세',
    transactionDate: daysAgo(3),
  },
  {
    id: '7',
    userId: 'demo',
    categoryId: 'c2',
    categoryName: '식비',
    type: 'expense',
    amount: 9800,
    memo: '아침',
    transactionDate: daysAgo(2),
  },
  {
    id: '8',
    userId: 'demo',
    categoryId: 'c6',
    categoryName: '부수입',
    type: 'income',
    amount: 150000,
    memo: '프리랜스',
    transactionDate: daysAgo(4),
  },
  {
    id: '9',
    userId: 'demo',
    categoryId: 'c4',
    categoryName: '쇼핑',
    type: 'expense',
    amount: 32000,
    memo: '의류',
    transactionDate: daysAgo(5),
  },
  {
    id: '10',
    userId: 'demo',
    categoryId: 'c2',
    categoryName: '식비',
    type: 'expense',
    amount: 15600,
    memo: '커피·간식',
    transactionDate: daysAgo(6),
  },
];

export function getMockMonthlySummary(): MonthlySummary {
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
}

export function getMockDailyExpenses(): DailyExpense[] {
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
}

export function getMockCategoryExpenses(): CategoryExpense[] {
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
}
