import type { Transaction } from '../model/transaction';

const localTransactions: Transaction[] = [];

export function addLocalTransaction(transaction: Transaction) {
  localTransactions.unshift(transaction);
}

export function getLocalTransactions() {
  return [...localTransactions];
}
