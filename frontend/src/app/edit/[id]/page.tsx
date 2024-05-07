'use client';

import React, { useState, useEffect } from 'react';
import Calendar from '@/components/Calendar';
import { FaEdit } from 'react-icons/fa';
import { FaArrowUpLong, FaArrowDownLong, FaCalendarDays } from 'react-icons/fa6';
import Link from 'next/link';
import { getFileUrl, isSafeImageType } from '@/app/utilities/helpers';
import { useAuthContext } from '@/contexts/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';

interface Hatch {
  num: number;
  imageUrl: string;
  isOpen: boolean;
  imageFile?: File | null;
}

interface HatchForBackend {
  num: number;
  imageUrl: string;
  imageFile?: File | null;
}

interface CalendarData {
  title: string;
  backgroundUrl: string;
  hatches: Hatch[];
}

interface Changes {
  title?: string;
  backgroundFile?: File | null;
  backgroundUrl?: string;
  hatches: Hatch[];
}

interface CalendarForBackend {
  title?: string;
  backgroundFile?: File | null;
  backgroundUrl?: string;
  hatches: HatchForBackend[];
}
// EDIT CALENDAR PAGE
const EditCalendarPage = () => {
  const router = useRouter();
  const { isLoggedIn, uid } = useAuthContext();

  // Redirect to the homepage if the user is not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  // State for the incoming calendar data
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);

  // State for the changed data
  const [changes, setChanges] = useState<Changes | null>(null);

  // State for the current hatch
  const [currentHatch, setCurrentHatch] = useState(1);

  // State for the hatches to display in the carousel
  const [displayHatches, setDisplayHatches] = useState<Hatch[]>([]);

  // Function to handle carousel navigation
  const handleCarouselNav = (direction: 'prev' | 'next') => {
    setCurrentHatch((prevHatch) => (direction === 'prev' ? Math.max(1, prevHatch - 1) : Math.min(24, prevHatch + 1)));
  };

  useEffect(() => {
    const fetchData = async () => {
      // Get the last part of the URL path, which should be the calendar ID
      const urlParts = window.location.pathname.split('/');
      const calendarId = urlParts[urlParts.length - 1];

      try {
        const response = await fetch(`http://localhost:8080/calendar/getcalendar/${uid}/${calendarId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: CalendarData = await response.json();
        setCalendarData(data);

        // Initialize changes and displayHatches after the data is fetched
        setChanges({
          title: data.title,
          backgroundUrl: data.backgroundUrl,
          hatches: data.hatches.map((hatch) => ({
            num: hatch.num,
            imageFile: null,
            imageUrl: hatch.imageUrl,
            isOpen: hatch.isOpen, // Use the original isOpen status
          })),
        });
        setDisplayHatches(
          data.hatches.map((hatch) => ({
            ...hatch,
            isOpen: true, // Set isOpen to true for display
          }))
        );
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      }
    };

    fetchData();
  }, []);

  // SET TITLE
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!changes) return;

    if (event.target.value === '' && changes.title) {
      const updatedChanges = { ...changes };
      delete updatedChanges.title;
      setChanges({ ...updatedChanges });
      return;
    }
    setChanges({ ...changes, title: event.target.value });
  };

  // SET BACKGROUND
  const handleBgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!changes) return;

    const file = event.target.files?.[0];
    if (file) {
      if (isSafeImageType(file.type)) {
        setChanges({
          ...changes,
          backgroundFile: file,
          backgroundUrl: getFileUrl(file),
        });
      } else {
        alert('Please upload an image!');
      }
    }
  };

  // RESET BACKGROUND
  const handleResetBg = () => {
    if (!changes) return;

    if (changes.backgroundFile) {
      const updatedChanges = { ...changes };
      delete updatedChanges.backgroundFile;
      delete updatedChanges.backgroundUrl;
      setChanges({ ...updatedChanges });
    }
  };

  // SET HATCHES
  const handleHatchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!changes) return;

    const file = event.target.files?.[0];
    if (file) {
      if (isSafeImageType(file.type)) {
        const updatedHatches = changes.hatches.map((hatch) => {
          if (hatch.num === currentHatch) {
            return { ...hatch, imageFile: file, imageUrl: getFileUrl(file) };
          }
          return hatch;
        });
        setChanges({ ...changes, hatches: updatedHatches });
      } else {
        alert('Please upload an image!');
      }
    }
  };

  // Reset hatch image file and url
  const handleResetHatch = () => {
    if (!changes) return;

    const updatedHatches = changes.hatches.map((hatch) => {
      if (hatch.num === currentHatch) {
        return {
          ...hatch,
          imageFile: null,
          imageUrl: calendarData?.hatches.find((h) => h.num === currentHatch)?.imageUrl ?? '',
        };
      }
      return hatch;
    });
    setChanges({ ...changes, hatches: updatedHatches });
  };

  // Toggle hatch
  const toggleHatch = (num: number) => {
    if (!changes) return;

    const updatedHatches = changes.hatches.map((hatch) => {
      if (hatch.num === num) {
        hatch.isOpen = !hatch.isOpen;
      }
      return hatch;
    });
    setChanges({ ...changes, hatches: updatedHatches });
  };

  // Toggle all hatches open/closed
  const handleToggleAll = () => {
    if (!changes) return;

    const toggleCriteria = !changes.hatches[0].isOpen;
    const updatedHatches = changes.hatches.map((hatch) => {
      hatch.isOpen = toggleCriteria;
      return hatch;
    });
    setChanges({ ...changes, hatches: updatedHatches });
  };

  const handleSubmit = async () => {
    if (!changes || !calendarData) return;

    // Build the data for the backend
    const calendar: CalendarForBackend = {
      title: changes.title ?? calendarData?.title,
      backgroundFile: changes.backgroundFile,
      backgroundUrl: '',
      hatches: [],
    };

    // Upload the background image to Firebase Storage and get the download URL
    if (changes.backgroundFile) {
      const bgStorageRef = ref(storage, `images/${uid}/${changes.backgroundFile.name}`);
      await uploadBytesResumable(bgStorageRef, changes.backgroundFile);
      const bgUrl = await getDownloadURL(bgStorageRef);
      calendar.backgroundUrl = bgUrl;
    } else {
      calendar.backgroundUrl = calendarData?.backgroundUrl;
    }

    // Upload the hatch images to Firebase Storage and get the download URLs
    const hatches = await Promise.all(
      changes.hatches.map(async (hatch, index) => {
        if (hatch.imageFile) {
          const hatchStorageRef = ref(storage, `images/${uid}/${hatch.imageFile.name}`);
          await uploadBytesResumable(hatchStorageRef, hatch.imageFile);
          const hatchUrl = await getDownloadURL(hatchStorageRef);
          return {
            num: hatch.num,
            imageFile: hatch.imageFile,
            imageUrl: hatchUrl,
            isOpen: calendarData.hatches[index].isOpen, // Include the original isOpen value
          };
        } else {
          return {
            num: hatch.num,
            imageFile: null,
            imageUrl: hatch.imageUrl,
            isOpen: calendarData.hatches[index].isOpen, // Include the original isOpen value
          };
        }
      })
    );

    calendar.hatches = [...hatches];

    // Get the last part of the URL path, which should be the calendar ID
    const urlParts = window.location.pathname.split('/');
    const calendarId = urlParts[urlParts.length - 1];

    try {
      const response = await fetch(`http://localhost:8080/calendar/editcalendar/${uid}/${calendarId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(calendar),
      });

      if (!response.ok) {
        throw new Error('Failed to edit calendar');
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error editing calendar:', error);
    }
  };

  // Render nothing if the user is not logged in
  if (!isLoggedIn) {
    return null;
  }

  return (
    <main className="grid md:grid-cols-[300px_1fr] min-h-screen">
      {/* View navigation on small screens */}
      <div className="md:hidden flex flex-col gap-3 w-max fixed bottom-5 right-5 z-20">
        <a href="#settings" className="btn btn-sm btn-accent text-lg">
          <FaArrowUpLong />
          <FaEdit />
        </a>
        <a href="#preview" className="btn btn-sm btn-accent text-lg">
          <FaArrowDownLong />
          <FaCalendarDays />
        </a>
      </div>
      {/* Settings */}
      <section id="settings" className="flex flex-col gap-12 max-w-[300px] mx-auto py-8 px-4 bg-base text-white">
        {/* Title */}
        <div>
          <h2 className="text-3xl">Title</h2>
          <input type="text" placeholder="Enter calendar title" className="input input-bordered w-full max-w-xs text-stone-900 bg-white" onChange={handleTitleChange} />
        </div>
        {/* Background */}
        <div>
          <h2 className="text-3xl">Background</h2>
          <div className="bg-slate-500 p-3 flex flex-col gap-3 rounded">
            <input type="file" className="file-input file-input-bordered w-full max-w-xs text-stone-900 bg-white" onChange={handleBgChange} />
            <button className="btn btn-warning btn-outline btn-sm" onClick={handleResetBg}>
              Reset
            </button>
          </div>
        </div>
        {/* Hatches */}
        <div>
          <h2 className="text-3xl">Hatches</h2>
          {/* Carousel */}
          <div className="bg-slate-500 p-3 flex flex-col gap-3 rounded">
            {/* Carousel navigation */}
            <div className="flex items-center justify-between gap-1">
              <button className="btn btn-warning btn-sm" onClick={() => handleCarouselNav('prev')}>
                &larr; prev
              </button>
              <p>{currentHatch}</p>
              <button className="btn btn-warning btn-sm" onClick={() => handleCarouselNav('next')}>
                next &rarr;
              </button>
            </div>
            {/* Carousel items */}
            <div className="bg-slate-700 flex flex-col gap-3 text-center p-2 rounded">
              {displayHatches.map((hatch) => (
                <div key={hatch.num} className={hatch.num === currentHatch ? 'block' : 'hidden'}>
                  <input type="file" className="file-input file-input-bordered w-full max-w-xs text-stone-900 bg-white" onChange={handleHatchChange} />
                </div>
              ))}
              <button className="btn btn-warning btn-outline btn-sm" onClick={handleResetHatch}>
                Reset
              </button>
            </div>
            {/* Hatch toggle all button */}
            <div className="bg-slate-700 flex flex-col gap-3 text-center p-2 rounded">
              <h3>Open/Close hatches</h3>
              <button className="btn btn-warning btn-outline btn-sm" onClick={handleToggleAll}>
                Toggle
              </button>
            </div>
          </div>
        </div>
        {/* Submit */}
        <button className="btn btn-primary text-base" onClick={handleSubmit}>
          Submit
        </button>
        {/* Cancel */}
        <Link className="btn btn-outline text-white text-base" href="/calendars">
          Cancel
        </Link>
      </section>

      {/* Preview */}
      {/* If there's no change, show the original data */}
      <section id="preview">{calendarData && <Calendar title={changes?.title ?? calendarData.title} backgroundUrl={changes?.backgroundUrl ?? calendarData.backgroundUrl} hatches={changes?.hatches ?? []} toggleHatch={toggleHatch} />}</section>
    </main>
  );
};

export default EditCalendarPage;
