'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import CalendarCard from '../../components/CalendarCard';
import { fontTitle } from '../utilities/font';
import { BsInfoCircle } from 'react-icons/bs';
import Link from 'next/link';

const CalendarsPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();

  // Redirect to the homepage if the user is not logged in
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.replace('/');
  //   }
  // }, [isLoggedIn, router]);

  // Render nothing if the user is not logged in
  // if (!isLoggedIn) {
  //   return null;
  // }

  // Render the content of page if the user is logged in
  return (
    <main className="content-width flex flex-col items-center gap-10">
      <div className={`${fontTitle} clr-accent text-4xl text-center bg-base`}>Welcome, Bartholomew!</div>

      {/* Alert */}
      {/* <div role="alert" className="alert mx-auto">
        <BsInfoCircle className="text-primary text-xl" />
        <span>You don't have any calendars yet.</span>
        <div>
          <button className="btn btn-sm btn-primary">Create</button>
        </div>
      </div> */}

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-5">
        <CalendarCard />
        <CalendarCard />
      </div>
      <Link href="/new" className="btn bg-accent text-black fixed bottom-5 right-5 z-10">
        + New Calendar
      </Link>
    </main>
  );
};

export default CalendarsPage;
