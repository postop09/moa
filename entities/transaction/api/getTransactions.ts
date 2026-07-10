import { queryTransactions } from '../lib/queryTransactions';
import type { GetTransactionsReq } from '../model/getTransactionsReq';
import type { GetTransactionsRes } from '../model/getTransactionsRes';

export const getTransactions = async (
  payload: GetTransactionsReq,
): Promise<GetTransactionsRes> => {
  return queryTransactions(payload);
};
