import Link from 'next/link';
import css from './GuestHome.module.css';

const GuestHome = () => {
  return (
    <div className={css['guestHome']}>
      <h2>Track your income and expenses easily</h2>
      <p>Sign up to manage your personal finance</p>
      <Link href="/auth/register">Get Started</Link>
    </div>
  );
};

export default GuestHome;
