import Link from 'next/link';
import css from './HeaderLogo.module.css';

const HeaderLogo = () => {
  return (
    <div className={css.headerLogo}>
      <span className={css.logoMark} />
      <Link href="/" className={css.headerTitle}>
        Expense Tracker
      </Link>
    </div>
  );
};

export default HeaderLogo;
