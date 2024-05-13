'use client';

import { fontTitle } from './utilities/font';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';

export default function Home() {
  const { isLoggedIn } = useAuthContext();

  return (
    <main className="content-width grid gap-10 md:flex items-center justify-center py-10">
      <div className="bg-base flex flex-col justify-center items-center md:items-start gap-5">
        <h1 className={`${fontTitle} clr-accent text-4xl text-center md:text-left`}>Personalised Online Advent Calendars</h1>
        <p className="clr-accent max-w-[600px] text-justify text-lg">Build your own custom-made online advent calendar with your favourite images. Share your creation with clients or friends.</p>
        <p className="clr-accent max-w-[600px] text-justify text-lg">Start crafting your custom advent calendar today and spread holiday cheer in a truly personal way.</p>
        {!isLoggedIn && (
          <Link href="/register" className="btn-main">
            Start Creating
          </Link>
        )}
        {isLoggedIn && (
          <Link href="/new" className="btn-main">
            Create Calendar
          </Link>
        )}
      </div>
      <div className="hidden md:block">
        <Image src="/landing-img.png" alt="Advent Calendar" width={800} height={400} priority={true} className="max-h-[400px] w-auto" />
      </div>
    </main>
  );
}
