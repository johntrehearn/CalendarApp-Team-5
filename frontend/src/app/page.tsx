import { fontTitle } from './utilities/font';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="content-width grid gap-10 md:grid-cols-[2fr_1fr] py-20">
      <div className="flex flex-col justify-center items-center md:items-start gap-5 bg-base">
        <h1 className={`${fontTitle} clr-accent text-4xl text-center md:text-left`}>Personalized Online Advent Calendars</h1>
        <p className="clr-accent">
          Create a delightful online advent calendar filled with your cherished images and heartwarming messages. Embrace the joy of the season by personalizing each day's surprise. Our user-friendly platform allows you to craft a unique countdown
          experience that captures the spirit of anticipation and togetherness. Start crafting your custom advent calendar today and spread holiday cheer in a truly personal way.
        </p>
        <button className="btn bg-accent">Read More</button>
      </div>
      <div className="hidden md:block">
        <Image src="/landing-img.png" alt="Advent Calendar" width={800} height={400} priority={true} />
      </div>
    </main>
  );
}
