import { fontTitle } from './layout';
import Spinner from '../components/loadingSpinner';

export default function Home() {
  return (
    <main>
      <h1 className={`${fontTitle} clr-accent text-4xl`}>Personalized Online Advent Calendars</h1>
      <Spinner />
    </main>
  );
}
