import { getLocalCategories } from '../lib/local-categories';
import type { Category } from '../model/category';
import { TransactionType } from '@/shared/model';

export const fetchCategories = async (
  type?: TransactionType,
): Promise<Category[]> => {
  const categories = getLocalCategories();

  return type
    ? categories.filter((category) => category.type === type)
    : categories;
};
