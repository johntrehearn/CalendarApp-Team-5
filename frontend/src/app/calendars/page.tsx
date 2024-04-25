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

  // Redirect to the homepage if the user is not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  // Hard coded calendars data for now
  const calendars = [
    {
      id: '1234',
      title: 'Pet Calendar',
      backgroundUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg',
    },
    {
      id: '5678',
      title: 'Your Advent Calendar',
      backgroundUrl: 'http://source.unsplash.com/a-close-up-of-a-very-large-star-in-the-sky-HvYO12QeS5g?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
    },
  ];

  // State for the incoming calendars data
  const [calendarsData, setCalendarsData] = useState<
    | {
        id: string;
        title: string;
        backgroundUrl: string;
      }[]
    | null
  >(calendars);

  // State to store the selected card
  const [selectedCard, setSelectedCard] = useState('');

  // When a card button is clicked, handleAction sets the selected card and performs the chosen action
  const handleAction = (id: string, action: string) => {
    // Setting the selected card
    setSelectedCard(id);

    // Navigate to the single calendar page and sending the cal id
    if (action === 'show') {
      router.push(`/calendar/${id}`);
    }

    // Open the delete modal for more actions
    if (action === 'delete') {
      openDeleteModal();
    }

    // Navigate to the edit page - also needs id???
    if (action === 'edit') {
      router.push('/edit');
    }

    // For now, just log which calendar is being shared
    if (action === 'share') {
      console.log(`Sharing calendar with id: ${id}`);
    }
  };

  const openDeleteModal = () => {
    const modal = document.getElementById('delete_modal') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const deleteCalendar = () => {
    console.log(`Deleting calendar with id: ${selectedCard}`);
  };

  // Get the title of the selected calendar for the delete modal
  const getSelectedCalTitle = () => {
    const selectedCal = calendarsData?.find((cal) => cal.id === selectedCard);
    return selectedCal?.title;
  };

  // Render nothing if the user is not logged in
  if (!isLoggedIn) {
    return null;
  }

  // Render the content of the page if the user is logged in
  return (
    <main className="content-width flex flex-col items-center gap-10">
      <div className={`${fontTitle} clr-accent text-4xl text-center bg-base`}>Welcome, Bartholomew!</div>

      {/* Info when there's no calendar to show */}
      {!calendarsData && (
        <div role="alert" className="alert mx-auto">
          <BsInfoCircle className="text-primary text-xl" />
          <span>You don't have any calendars yet.</span>
          <div>
            <Link href="/new" className="btn btn-sm btn-primary">
              Create
            </Link>
          </div>
        </div>
      )}

      {/* Cards with New Calendar btn */}
      {calendarsData && (
        <>
          <div className="flex flex-wrap gap-5 justify-center">
            {calendarsData.map((calendar) => (
              <CalendarCard key={calendar.id} id={calendar.id} title={calendar.title} backgroundUrl={calendar.backgroundUrl} handleAction={handleAction} />
            ))}
          </div>

          <Link href="/new" className="btn bg-accent text-black fixed bottom-5 right-5 z-10">
            + New Calendar
          </Link>
        </>
      )}

      {/* Delete Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{`Do you want to delete this calendar: ${getSelectedCalTitle()}?`}</h3>
          <p className="py-4">This action can't be reversed.</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-5">
              <button className="btn btn-error" onClick={deleteCalendar}>
                Delete
              </button>
              <button className="btn btn-outline">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default CalendarsPage;
