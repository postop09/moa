import {
  getLocalCategories,
  updateLocalCategory,
} from '../lib/local-categories';
import { getDefaultColor, normalizeBudget } from '../lib/categoryDefaults';
import type { Category } from '../model/category';
import type { UpdateCategoryReq } from '../model/updateCategoryReq';

export async function updateCategory(
  payload: UpdateCategoryReq,
): Promise<Category> {
  const budget = normalizeBudget(payload.budget);

  updateLocalCategory(payload.id, {
    name: payload.name.trim(),
    type: payload.type,
    color: getDefaultColor(payload.type),
    budget,
  });

  const updated = getLocalCategories().find(
    (category) => category.id === payload.id,
  );

  if (!updated) {
    throw new Error('예산 항목을 찾을 수 없습니다.');
  }

  return updated;
}
