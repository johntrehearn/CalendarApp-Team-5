'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';

type Props = {};

const CalendarsPage = (props: Props) => {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();

  // Redirect to the homepage if the user is not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  // Render nothing if the user is not logged in
  if (!isLoggedIn) {
    return null;
  }

  // Render the content of page if the user is logged in
  return <div>CalendarsPage goes here</div>;
};

export default CalendarsPage;
