import type { TransactionType } from './transactionType';

export type GetTransactionsReq = {
  householdId: string;
  type?: TransactionType;
  categoryId?: string;
  /** YYYY-MM */
  yearMonth?: string;
  /** YYYY — yearMonth가 없을 때만 사용 */
  year?: number;
};
