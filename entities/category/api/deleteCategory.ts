import { deleteLocalCategory } from '../lib/local-categories';

export async function deleteCategory(id: string): Promise<void> {
  deleteLocalCategory(id);
}
