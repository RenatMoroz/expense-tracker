'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './RegisterForm.module.css';

const RegisterForm = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || 'Registration failed');
        return;
      }

      router.push('/auth/login');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.registerForm}>
      <h1>Register</h1>
      <p className={css.subtitle}>
        Create an account to track your income and expenses.
      </p>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.field}>
          <span>Name</span>
          <input
            className={css.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>
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
            placeholder="Create a password"
          />
        </label>
        <label className={css.field}>
          <span>Confirm Password</span>
          <input
            className={css.input}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat your password"
          />
        </label>
        {error && <div className={css.error}>{error}</div>}
        <button className={css.submitButton} type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
