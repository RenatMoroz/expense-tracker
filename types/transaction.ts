export interface Transaction {
  _id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransaction {
  title: string;
  amount: number;
  type: 'income' | 'expense';
}

export interface UpdateTransaction {
  title?: string;
  amount?: number;
  type?: 'income' | 'expense';
}
