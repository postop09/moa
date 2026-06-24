import { supabase } from '@/shared/api';
import { Colors, isSupabaseConfigured } from '@/shared/config';

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

type CategoryRow = {
  id: string;
  user_id: string;
  name: string;
  type: CategoryType;
  icon: string | null;
  color: string | null;
  sort_order: number;
  budget: number | null;
};

function getDefaultColor(type: CategoryType) {
  return type === 'income' ? Colors.light.income : Colors.light.expense;
}

function normalizeBudget(budget?: number | null) {
  if (budget === undefined || budget === null || budget <= 0) {
    return null;
  }

  return budget;
}

function mapCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    type: row.type,
    icon: row.icon,
    color: row.color,
    sortOrder: row.sort_order,
    budget: row.budget === null ? null : Number(row.budget),
  };
}

export async function fetchCategories(
  type?: CategoryType,
): Promise<Category[]> {
  if (!isSupabaseConfigured) {
    const categories = getLocalCategories();

    return type
      ? categories.filter((category) => category.type === type)
      : categories;
  }

  let query = supabase
    .from('categories')
    .select('id, user_id, name, type, icon, color, sort_order, budget')
    .order('sort_order', { ascending: true });

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => mapCategory(row as CategoryRow));
}

export async function createCategory(
  input: CreateCategoryInput,
): Promise<Category> {
  const budget = normalizeBudget(input.budget);

  if (!isSupabaseConfigured) {
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

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }

  const existing = await fetchCategories(input.type);
  const sortOrder =
    existing.length > 0
      ? Math.max(...existing.map((category) => category.sortOrder)) + 1
      : 1;

  const { data, error } = await supabase
    .from('categories')
    .insert({
      user_id: user.id,
      name: input.name.trim(),
      type: input.type,
      color: getDefaultColor(input.type),
      sort_order: sortOrder,
      budget,
    })
    .select('id, user_id, name, type, icon, color, sort_order, budget')
    .single();

  if (error) {
    throw error;
  }

  return mapCategory(data as CategoryRow);
}

export async function updateCategory(
  input: UpdateCategoryInput,
): Promise<Category> {
  const budget = normalizeBudget(input.budget);

  if (!isSupabaseConfigured) {
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

  const { data, error } = await supabase
    .from('categories')
    .update({
      name: input.name.trim(),
      type: input.type,
      color: getDefaultColor(input.type),
      budget,
    })
    .eq('id', input.id)
    .select('id, user_id, name, type, icon, color, sort_order, budget')
    .single();

  if (error) {
    throw error;
  }

  return mapCategory(data as CategoryRow);
}

export async function deleteCategory(id: string): Promise<void> {
  if (!isSupabaseConfigured) {
    deleteLocalCategory(id);
    return;
  }

  const { error } = await supabase.from('categories').delete().eq('id', id);

  if (error) {
    throw error;
  }
}
