import Link from 'next/link';
import LoginForm from '@/components/AuthForm/LoginForm/LoginForm';
import styles from './page.module.css';

const LoginPage = () => {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <LoginForm />
        <p className={styles.note}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className={styles.link}>
            Register now
          </Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
