import Link from 'next/link';
import RegisterForm from '@/components/AuthForm/RegisterForm/RegisterForm';
import styles from './page.module.css';

const RegisterPage = () => {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <RegisterForm />
        <p className={styles.note}>
          Already have an account?{' '}
          <Link href="/auth/login" className={styles.link}>
            Login here
          </Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
