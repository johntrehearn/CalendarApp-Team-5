'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import CalendarCard from '../../components/CalendarCard';
import { fontTitle } from '../utilities/font';
import { BsInfoCircle } from 'react-icons/bs';
import Link from 'next/link';

const CalendarsPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();

  const calendars = [
    {
      title: 'Pet Calendar',
      imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg',
    },
    {
      title: 'Your Advent Calendar',
      imageUrl: 'http://source.unsplash.com/a-close-up-of-a-very-large-star-in-the-sky-HvYO12QeS5g?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
    },
  ];

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

  const [selectedCard, setSelectedCard] = useState('');

  // Render the content of page if the user is logged in
  return (
    <main className="content-width flex flex-col items-center gap-10">
      <div className={`${fontTitle} clr-accent text-4xl text-center bg-base`}>Welcome, Bartholomew!</div>

      {/* Alert */}
      {!calendars && (
        <div role="alert" className="alert mx-auto">
          <BsInfoCircle className="text-primary text-xl" />
          <span>You don't have any calendars yet.</span>
          <div>
            <button className="btn btn-sm btn-primary">Create</button>
          </div>
        </div>
      )}

      {/* Cards */}
      {calendars && (
        <>
          <div className="flex flex-wrap gap-5 justify-center">
            {calendars.map((calendar) => (
              <CalendarCard key={calendar.title} title={calendar.title} imageUrl={calendar.imageUrl} />
            ))}
          </div>

          <Link href="/new" className="btn bg-accent text-black fixed bottom-5 right-5 z-10">
            + New Calendar
          </Link>
        </>
      )}
    </main>
  );
};

export default CalendarsPage;
