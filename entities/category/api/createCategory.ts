import {
  addLocalCategory,
  getNextLocalSortOrder,
} from '../lib/local-categories';
import { getDefaultColor, normalizeBudget } from '../lib/categoryDefaults';
import type { Category } from '../model/category';
import type { CreateCategoryReq } from '../model/createCategoryReq';

export async function createCategory(
  payload: CreateCategoryReq,
): Promise<Category> {
  const budget = normalizeBudget(payload.budget);
  const category: Category = {
    id: `local-cat-${Date.now()}`,
    userId: 'demo',
    name: payload.name.trim(),
    type: payload.type,
    icon: null,
    color: getDefaultColor(payload.type),
    sortOrder: getNextLocalSortOrder(payload.type),
    budget,
  };

  addLocalCategory(category);
  return category;
}
