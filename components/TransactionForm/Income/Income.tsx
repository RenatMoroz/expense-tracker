'use client';
import { useTransactionStore } from '@/store/transactionStore';
import css from './Income.module.css';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

const Income = () => {
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
      type: 'income',
    });

    setTitle('');
    setAmount(0);
    router.push('/');
  };
  return (
    <div className={css['income']}>
      <form onSubmit={handleSubmit}>
        <h2>Add Income</h2>
        <h2>Title</h2>
        <input
          type="text"
          name="title"
          placeholder="Salary"
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

export default Income;
