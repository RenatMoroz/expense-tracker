import { useTransactionStore } from '@/store/transactionStore';
import css from './TransactionHistory.module.css';

const TransactionHistory = () => {
  const { transactions } = useTransactionStore();
  return (
    <div className={css['transactionHistory']}>
      <h3>Recent Transactions</h3>
      <ul>
        {transactions.map((el) => {
          const isIncome = el.type === 'income';
          return (
            <li key={el._id}>
              <span>{el.title}</span>
              <span
                className={
                  isIncome ? css['incomeAmount'] : css['expenseAmount']
                }
              >
                {isIncome ? '+' : '-'}₴{el.amount}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TransactionHistory;
