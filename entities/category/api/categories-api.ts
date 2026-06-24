import { Colors } from '@/shared/config';

import {
  addLocalCategory,
  deleteLocalCategory,
  getLocalCategories,
  getNextLocalSortOrder,
  updateLocalCategory,
} from '../lib/local-categories';
import type {
  Category,
  CategoryType,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../model/types';

function getDefaultColor(type: CategoryType) {
  return type === 'income' ? Colors.light.income : Colors.light.expense;
}

function normalizeBudget(budget?: number | null) {
  if (budget === undefined || budget === null || budget <= 0) {
    return null;
  }

  return budget;
}

export async function fetchCategories(
  type?: CategoryType,
): Promise<Category[]> {
  const categories = getLocalCategories();

  return type
    ? categories.filter((category) => category.type === type)
    : categories;
}

export async function createCategory(
  input: CreateCategoryInput,
): Promise<Category> {
  const budget = normalizeBudget(input.budget);
  const category: Category = {
    id: `local-cat-${Date.now()}`,
    userId: 'demo',
    name: input.name.trim(),
    type: input.type,
    icon: null,
    color: getDefaultColor(input.type),
    sortOrder: getNextLocalSortOrder(input.type),
    budget,
  };

  addLocalCategory(category);
  return category;
}

export async function updateCategory(
  input: UpdateCategoryInput,
): Promise<Category> {
  const budget = normalizeBudget(input.budget);

  updateLocalCategory(input.id, {
    name: input.name.trim(),
    type: input.type,
    color: getDefaultColor(input.type),
    budget,
  });

  const updated = getLocalCategories().find(
    (category) => category.id === input.id,
  );

  if (!updated) {
    throw new Error('예산 항목을 찾을 수 없습니다.');
  }

  return updated;
}

export async function deleteCategory(id: string): Promise<void> {
  deleteLocalCategory(id);
}
