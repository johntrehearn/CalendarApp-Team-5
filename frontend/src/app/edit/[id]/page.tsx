'use client';
import React, { useState } from 'react';
import Calendar from '@/components/Calendar';
import { FaEdit } from 'react-icons/fa';
import { FaArrowUpLong, FaArrowDownLong, FaCalendarDays } from 'react-icons/fa6';
import Link from 'next/link';
import { getFileUrl, isSafeImageType } from '@/app/utilities/helpers';

// EDIT CALENDAR PAGE
const EditCalendarPage = () => {
  // For now, we'll use a hardcoded object for the fetched data
  const fetchedCalData = {
    title: 'Advent Calendar',
    backgroundUrl: 'https://images.pexels.com/photos/18512842/pexels-photo-18512842/free-photo-of-autumn-forest-at-night.jpeg',
    hatches: [
      { num: 1, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 2, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 3, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 4, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 5, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 6, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 7, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 8, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 9, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 10, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 11, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 12, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 13, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 14, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 15, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 16, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 17, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 18, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 19, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 20, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 21, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 22, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 23, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
      { num: 24, imageUrl: 'https://images.pexels.com/photos/357141/pexels-photo-357141.jpeg', isOpen: false },
    ],
  };

  // State for the incoming calendar data
  const [calendarData, setCalendarData] = useState<{
    title: string;
    backgroundUrl: string;
    hatches: { num: number; imageUrl: string; isOpen: boolean }[];
  } | null>(fetchedCalData);

  // State for the changed data
  const [changes, setChanges] = useState<{
    title?: string;
    backgroundFile?: File | null;
    backgroundUrl?: string;
    hatches: { num: number; imageFile: File | null; imageUrl: string; isOpen: boolean }[];
  }>({
    hatches: calendarData?.hatches.map((hatch) => ({ num: hatch.num, imageFile: null, imageUrl: hatch.imageUrl, isOpen: true })) ?? [],
  });

  // SET TITLE
  // This function updates the calendar title in the state
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // If the title is empty, remove the title key from the changes object
    if (event.target.value === '' && changes.title) {
      const updatedChanges = { ...changes };
      delete updatedChanges.title;
      setChanges({ ...updatedChanges });
      return;
    }
    setChanges({ ...changes, title: event.target.value });
  };

  // SET BACKGROUND
  // This function updates the background image file and url in the state
  const handleBgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (isSafeImageType(file.type)) {
        setChanges({ ...changes, backgroundFile: file, backgroundUrl: getFileUrl(file) });
      } else {
        alert('Please upload an image!');
      }
    }
  };

  // RESET BACKGROUND
  const handleResetBg = () => {
    if (changes.backgroundFile) {
      const updatedChanges = { ...changes };
      delete updatedChanges.backgroundFile;
      delete updatedChanges.backgroundUrl;
      setChanges({ ...updatedChanges });
    }
  };

  // SET HATCHES
  // This state is used to keep track of the current hatch being edited
  // The number corresponds to hatch.num and NOT the index of the array
  const [currentHatch, setCurrentHatch] = useState(1);
  // Carousel navigation sets the current hatch
  const handleCarouselNav = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentHatch((prevState) => (prevState === 1 ? 24 : prevState - 1));
    } else {
      setCurrentHatch((prevState) => (prevState === 24 ? 1 : prevState + 1));
    }
  };

  // Set the image file and url for the current hatch in the state
  const handleHatchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    const updatedHatches = changes.hatches.map((hatch) => {
      if (hatch.num === currentHatch) {
        return { ...hatch, imageFile: null, imageUrl: calendarData?.hatches.find((h) => h.num === currentHatch)?.imageUrl ?? '' };
      }
      return hatch;
    });
    setChanges({ ...changes, hatches: updatedHatches });
  };

  // This toggles isOpen for the hatch with the given number
  // and updates the state accordingly
  // The hatches are open by default, and there's no restriction here
  const toggleHatch = (num: number) => {
    if (!changes) return;
    const updatedHatches = changes?.hatches.map((hatch) => {
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

  // SUBMIT
  // This function logs the current state of the data state
  // and prepares the data for the backend
  // It will be extended with a POST request, a message? and a redirect to the My Calendars page
  const handleSubmit = () => {
    const dataForBackend = {
      ...changes,
      hatches: changes.hatches.filter((hatch) => hatch.imageFile).map((hatch) => ({ num: hatch.num, imageFile: hatch.imageFile })),
    };
    if ('backgroundUrl' in dataForBackend) {
      delete dataForBackend.backgroundUrl;
    }
    if (dataForBackend.hatches.length === 0) {
      const { hatches, ...dataWithoutHatches } = dataForBackend;
      console.log('Changes: ', dataWithoutHatches);
    } else {
      console.log('Changes: ', dataForBackend);
    }
  };

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
            <input type="file" className="file-input file-input-bordered w-full max-w-xs text-stone-900" onChange={handleBgChange} />
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
              {changes?.hatches.map((hatch) => (
                <div key={hatch.num} className={hatch.num === currentHatch ? 'block' : 'hidden'}>
                  <input type="file" className="file-input file-input-bordered w-full max-w-xs text-stone-900" onChange={handleHatchChange} />
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
        <button className="btn" onClick={handleSubmit}>
          Submit
        </button>
        {/* Cancel */}
        <Link className="btn btn-outline text-white" href="/calendars">
          Cancel
        </Link>
      </section>

      {/* Preview */}
      {/* If there's no change, show the original data */}
      <section id="preview">{calendarData && <Calendar title={changes.title ?? calendarData.title} backgroundUrl={changes.backgroundUrl ?? calendarData.backgroundUrl} hatches={changes.hatches} toggleHatch={toggleHatch} />}</section>
    </main>
  );
};

export default EditCalendarPage;
