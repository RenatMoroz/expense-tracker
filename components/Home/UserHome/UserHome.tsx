'use client';
import Link from 'next/link';
import css from './UserHome.module.css';
import { useEffect } from 'react';
import { useTransactionStore } from '@/store/transactionStore';
import TransactionHistory from '../TransactionHistory/TransactionHistory';

const UserHome = () => {
  const { balance, transactions, isLoading, resetBalance, fetchTransactions } =
    useTransactionStore();
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  useEffect(() => {
    fetchTransactions();
  }, []);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className={css['userHome']}>
      <div className={css['balanceCard']}>
        <h2>Balance: ₴{balance}</h2>
      </div>
      <div>
        <div className={css['incomeSection']}>
          <h3>Income</h3>
          <p>+₴{totalIncome}</p>
          <Link href="/income/add">Add Income</Link>
        </div>
        <div className={css['expenseSection']}>
          <h3>Expenses</h3>
          <p>-₴{totalExpenses}</p>
          <Link href="/expenses/add">Add Expense</Link>
        </div>
      </div>
      <button onClick={resetBalance}>Reset Balance</button>
      <div>
        <TransactionHistory />
      </div>
    </div>
  );
};

export default UserHome;
