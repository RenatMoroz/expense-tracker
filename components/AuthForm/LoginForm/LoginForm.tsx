'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './LoginForm.module.css';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || 'Login failed');
        return;
      }

      router.push('/');
    } catch {
      setError('Unable to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.loginForm}>
      <h1>Login</h1>
      <p className={css.subtitle}>
        Sign in to your account and start tracking expenses.
      </p>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.field}>
          <span>Email</span>
          <input
            className={css.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </label>
        <label className={css.field}>
          <span>Password</span>
          <input
            className={css.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </label>
        {error && <div className={css.error}>{error}</div>}
        <button className={css.submitButton} type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
