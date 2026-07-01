import { getLocalCategories } from '../lib/local-categories';
import type { Category } from '../model/category';
import type { CategoryType } from '../model/categoryType';
export const fetchCategories = async (
  type?: CategoryType,
): Promise<Category[]> => {
  const categories = getLocalCategories();
  return type
    ? categories.filter((category) => category.type === type)
    : categories;
};
