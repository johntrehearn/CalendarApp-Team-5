import Link from 'next/link';
import { fontTitle } from './utilities/font';

const PageNotFound: React.FC = () => {
  return (
    <main className="content-width flex flex-col gap-5 justify-center items-center clr-accent">
      <h2 className={`${fontTitle} card-title text-6xl bg-base`}>404 - Page Not Found</h2>
      <p className="text-xl bg-base">Looks like our webpage took a detour through Santa&apos;s workshop and got lost in the tinsel.</p>

      <Link href="/">
        <button className="btn-main">Back to Home</button>
      </Link>
    </main>
  );
};

export default PageNotFound;
