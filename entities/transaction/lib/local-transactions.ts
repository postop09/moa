import type { Transaction } from '../model/transaction';
const localTransactions: Transaction[] = [];
export const addLocalTransaction = (transaction: Transaction) => {
  localTransactions.unshift(transaction);
};
export const getLocalTransactions = () => {
  return [...localTransactions];
};
