'use client';

import { useState, useEffect } from 'react';
import Calendar from '@/components/Calendar';
import { useAuthContext } from '@/contexts/AuthContext';
import Spinner from '@/components/loadingSpinner';
import { IoShareSocial } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Hatch {
  num: number;
  imageFile: string;
  imageUrl: string;
  isOpen: boolean;
}

interface CalendarData {
  title: string;
  backgroundFile: string;
  backgroundUrl: string;
  hatches: Hatch[];
}

const SingleCalendarPage = () => {
  const { uid } = useAuthContext();
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);

  const updateCalendar = async (newCalendarId: string, updatedCalendarData: CalendarData) => {
    // Get the last part of the URL path, which should be the calendar ID

    const urlParts = window.location.pathname.split('/');
    const uid = urlParts[urlParts.length - 2];
    const calendarId = urlParts[urlParts.length - 1];

    try {
      const response = await fetch(`http://localhost:8080/calendar/updatecalendar/${uid}/${calendarId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCalendarData),
      });

      if (!response.ok) {
        throw new Error('Failed to update calendar');
      }

      console.log('Calendar updated successfully');
    } catch (error) {
      console.error('Error updating calendar:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const urlParts = window.location.pathname.split('/');
      const uid = urlParts[urlParts.length - 2];
      const calendarId = urlParts[urlParts.length - 1];

      console.log(uid);
      if (!uid) return;

      try {
        const response = await fetch(`http://localhost:8080/calendar/getcalendar/${uid}/${calendarId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: CalendarData = await response.json();
        console.log(data);
        setCalendarData(data);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      }
    };

    fetchData();
  }, [uid]);

  const toggleHatch = async (hatchNum: number) => {
    if (!calendarData) return;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const isDecember = currentMonth === 12;
    const isAdventDay = hatchNum <= currentDay && isDecember;
    const isPastDec24 = isDecember && currentDay > 24;

    let canOpenHatch = false;
    if (isPastDec24 || isAdventDay) {
      canOpenHatch = true;
    }

    if (!canOpenHatch) {
      alert("You can't open this hatch yet!");
      return;
    }

    const updatedHatches = calendarData.hatches.map((hatch) => {
      if (hatch.num === hatchNum) {
        return { ...hatch, isOpen: !hatch.isOpen };
      }
      return hatch;
    });

    const updatedCalendarData = {
      ...calendarData,
      hatches: updatedHatches,
    };
    setCalendarData(updatedCalendarData);

    const urlParts = window.location.pathname.split('/');
    const uid = urlParts[urlParts.length - 2];
    const calendarId = urlParts[urlParts.length - 1];

    // Update the specific hatch status on the server
    try {
      const response = await fetch(`http://localhost:8080/calendar/updatehatch/${uid}/${calendarId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hatch: updatedHatches.find((hatch) => hatch.num === hatchNum),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update hatch status');
      }

      console.log('Hatch status updated successfully');
    } catch (error) {
      console.error('Error updating hatch status:', error);
    }

    await updateCalendar(calendarId, updatedCalendarData);
  };

  const handleShare = () => {
    const loadingToastId = toast.loading('Copying link...');

    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log('URL copied to clipboard successfully!');
        // Show toast message if copying is successful
        toast.update(loadingToastId, {
          render: 'URL copied to clipboard successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
        // Show toast message with error message if copying fails
        toast.update(loadingToastId, {
          render: 'Could not copy text.',
          type: 'error',
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

  return (
    <main>
      {/* Show Calendar */}
      {calendarData && (
        <>
          <Calendar title={calendarData.title} backgroundUrl={calendarData.backgroundUrl} hatches={calendarData.hatches} toggleHatch={toggleHatch} />
          <button className="btn-main fixed bottom-5 right-5 z-10" onClick={handleShare}>
            <IoShareSocial fontSize={22} />
            Share
          </button>
        </>
      )}

      {!calendarData && <Spinner />}

      <ToastContainer position="bottom-left" theme="dark" />
    </main>
  );
};

export default SingleCalendarPage;
