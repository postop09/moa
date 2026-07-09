import { TransactionType } from '@/shared/model';

export type Category = {
  id: string;
  householdId: string;
  name: string;
  type: TransactionType;
  budget?: number;
  createdAt: string;
};
