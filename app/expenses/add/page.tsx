import Expenses from '@/components/TransactionForm/Expenses/Expenses';
import css from '@/app/page.module.css';

const Page = () => {
  return (
    <div className={css['page']}>
      <Expenses />
    </div>
  );
};

export default Page;
