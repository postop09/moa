export type CategoryType = 'income' | 'expense';

export type Category = {
  id: string;
  userId: string;
  name: string;
  type: CategoryType;
  icon: string | null;
  color: string | null;
  sortOrder: number;
};
