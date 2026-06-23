import { supabase } from '@/shared/api';
import { isSupabaseConfigured } from '@/shared/config';

import { mockCategories } from '../lib/mock-categories';
import type { Category, CategoryType } from '../model/types';

type CategoryRow = {
  id: string;
  user_id: string;
  name: string;
  type: CategoryType;
  icon: string | null;
  color: string | null;
  sort_order: number;
};

function mapCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    type: row.type,
    icon: row.icon,
    color: row.color,
    sortOrder: row.sort_order,
  };
}

export async function fetchCategories(
  type?: CategoryType,
): Promise<Category[]> {
  if (!isSupabaseConfigured) {
    const categories = [...mockCategories].sort(
      (a, b) => a.sortOrder - b.sortOrder,
    );

    return type
      ? categories.filter((category) => category.type === type)
      : categories;
  }

  let query = supabase
    .from('categories')
    .select('id, user_id, name, type, icon, color, sort_order')
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
