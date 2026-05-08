'use client';

import Link from 'next/link';
import css from './HeaderAuth.module.css';
import { useAuthStore } from '@/store/auth';

const HeaderAuth = () => {
  const { isAuth, logout } = useAuthStore();

  return (
    <div className={css.headerAuth}>
      {!isAuth ? (
        <>
          <Link href="/auth/login" type="button" className={css.loginButton}>
            Login
          </Link>
          <Link
            href="/auth/register"
            type="button"
            className={css.registerButton}
          >
            Register
          </Link>
        </>
      ) : (
        <Link
          href="/"
          type="button"
          className={css.logoutButton}
          onClick={logout}
        >
          Logout
        </Link>
      )}
    </div>
  );
};

export default HeaderAuth;
