import {
  CreateTransaction,
  Transaction,
  UpdateTransaction,
} from '@/types/transaction';
import { create } from 'zustand';
import {
  getTransactions,
  createTransaction as createTransactionService,
  deleteTransaction as deleteTransactionService,
  updateTransaction as updateTransactionService,
  deleteAllTransactions,
} from '@/services/transactions';

type TransactionStore = {
  transactions: Transaction[];
  isLoading: boolean;
  balance: number;

  resetBalance: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  createTransaction: (transaction: CreateTransaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  updateTransaction: (
    id: string,
    transaction: UpdateTransaction
  ) => Promise<void>;
};

const calculateBalance = (transactions: Transaction[]) => {
  return transactions.reduce((acc, transaction) => {
    return transaction.type === 'income'
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);
};

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  isLoading: false,
  balance: 0,

  resetBalance: async () => {
    await deleteAllTransactions();
    set({ transactions: [], balance: 0 });
  },

  fetchTransactions: async () => {
    set({ isLoading: true });
    try {
      const data = await getTransactions();
      set({ transactions: data, balance: calculateBalance(data) });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  createTransaction: async (transaction) => {
    set({ isLoading: true });
    try {
      const newTransaction = await createTransactionService(transaction);
      const updatedTransactions = [newTransaction, ...get().transactions];
      set({
        transactions: updatedTransactions,
        balance: calculateBalance(updatedTransactions),
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTransaction: async (id) => {
    set({ isLoading: true });
    try {
      await deleteTransactionService(id);
      const updatedTransactions = get().transactions.filter(
        (t) => t._id !== id
      );
      set({
        transactions: updatedTransactions,
        balance: calculateBalance(updatedTransactions),
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateTransaction: async (id, transaction) => {
    set({ isLoading: true });
    try {
      const updatedTransaction = await updateTransactionService(
        id,
        transaction
      );
      const updatedTransactions = get().transactions.map((t) =>
        t._id === id ? updatedTransaction : t
      );
      set({
        transactions: updatedTransactions,
        balance: calculateBalance(updatedTransactions),
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
