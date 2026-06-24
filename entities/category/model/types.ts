export type CategoryType = 'income' | 'expense';

export type Category = {
  id: string;
  userId: string;
  name: string;
  type: CategoryType;
  icon: string | null;
  color: string | null;
  sortOrder: number;
  budget: number | null;
};

export type CreateCategoryInput = {
  name: string;
  type: CategoryType;
  budget?: number | null;
};

export type UpdateCategoryInput = {
  id: string;
  name: string;
  type: CategoryType;
  budget?: number | null;
};
