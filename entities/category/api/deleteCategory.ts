import { deleteLocalCategory } from '../lib/local-categories';

export const deleteCategory = async (id: string): Promise<void> => {
  deleteLocalCategory(id);
};
