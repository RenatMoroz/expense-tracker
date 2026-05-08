'use client';
import { useAuthStore } from '@/store/auth';
import css from './Home.module.css';
import { useEffect } from 'react';
import UserHome from './UserHome/UserHome';
import GuestHome from './GuestHome/GuestHome';

const Home = () => {
  const { isAuth, checkAuth, isLoading } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);
  if (isLoading) return <div>Loading...</div>;
  if (isAuth) return <UserHome />;

  return <GuestHome />;
};

export default Home;
