import { CreateTransaction, UpdateTransaction } from '@/types/transaction';
import { nextApi } from '@/services/serverConfig';

export async function getTransactions() {
  const result = await nextApi.get('/transactions');
  return result.data;
}

export async function createTransaction(body: CreateTransaction) {
  const result = await nextApi.post('/transactions', body);
  return result.data;
}

export async function deleteTransaction(id: string) {
  const result = await nextApi.delete(`/transactions/${id}`);
  return result.data;
}

export async function updateTransaction(id: string, body: UpdateTransaction) {
  const result = await nextApi.patch(`/transactions/${id}`, body);
  return result.data;
}

export async function deleteAllTransactions() {
  const result = await nextApi.delete('/transactions/all');
  return result.data;
}
