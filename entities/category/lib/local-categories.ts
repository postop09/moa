import type { Category } from '../model/category';
import { mockCategories } from './mock-categories';

let localCategories: Category[] = [...mockCategories];

export function getLocalCategories(): Category[] {
  return [...localCategories].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function addLocalCategory(category: Category) {
  localCategories = [...localCategories, category];
}

export function updateLocalCategory(
  id: string,
  updates: Pick<Category, 'name' | 'type' | 'color' | 'budget'>,
) {
  localCategories = localCategories.map((category) =>
    category.id === id ? { ...category, ...updates } : category,
  );
}

export function deleteLocalCategory(id: string) {
  localCategories = localCategories.filter((category) => category.id !== id);
}

export function getNextLocalSortOrder(type: Category['type']) {
  const sameType = localCategories.filter((category) => category.type === type);

  if (!sameType.length) {
    return 1;
  }

  return Math.max(...sameType.map((category) => category.sortOrder)) + 1;
}
