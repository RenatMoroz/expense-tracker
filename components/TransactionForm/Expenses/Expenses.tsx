'use client';
import { useEffect, useState } from 'react';
import css from './Expenses.module.css';
import { useTransactionStore } from '@/store/transactionStore';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

const Expenses = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const { createTransaction } = useTransactionStore();
  const { isAuth } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (!isAuth) {
      router.push('/auth/login');
    }
  }, [isAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTransaction({
      title,
      amount,
      type: 'expense',
    });
    setTitle('');
    setAmount(0);
    router.push('/');
  };
  return (
    <div className={css['expenses']}>
      <form onSubmit={handleSubmit}>
        <h2>Add Expense</h2>
        <h2>Title</h2>
        <input
          type="text"
          name="title"
          placeholder="Food"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2>Amount</h2>
        <input
          type="number"
          name="amount"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Expenses;
