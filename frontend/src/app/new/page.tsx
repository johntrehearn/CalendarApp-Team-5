'use client';
import React, { useState, useEffect } from 'react';
import Calendar from '@/components/Calendar';
import { FaEdit } from 'react-icons/fa';
import { FaArrowUpLong, FaArrowDownLong, FaCalendarDays } from 'react-icons/fa6';
import { getFileUrl, isSafeImageType } from '../utilities/helpers';
import { useAuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase/firebase';

// This type is for the overall state of the New Calendar page
// It will be used to pick necessary data for the Calendar component (preview)
// and for the backend (submit)
type DataType = {
  title: string;
  backgroundFile: File | null;
  backgroundUrl: string | null;
  hatches: HatchType[];
};
type HatchType = {
  num: number;
  imageFile: File | null;
  imageUrl: string | null;
  isOpen: boolean;
};

// NEW CALENDAR PAGE
const NewCalendarPage = () => {
  const { isLoggedIn, uid } = useAuthContext();
  const router = useRouter();

  // Redirect to the homepage if the user is not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  // DATA STATE
  // It uses DataType defined above
  // Default values are mostly null or empty arrays so the user can fill them in
  // The hatches array is initialized with 24 (hardcoded) elements for now
  // and they are open by default for easier viewing
  const [data, setData] = useState<DataType>({
    title: 'Calendar',
    backgroundFile: null,
    backgroundUrl: null,
    hatches: new Array(24).fill(null).map((_, index) => ({
      num: index + 1,
      imageFile: null,
      imageUrl: null,
      isOpen: true,
    })),
  });

  // SET TITLE
  // This function updates the calendar title in the state
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setData({ ...data, title: 'Calendar' });
    } else {
      setData({ ...data, title: event.target.value });
    }
  };

  // SET BACKGROUND
  // This function updates the background image file and url in the state
  const handleBgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (isSafeImageType(file.type)) {
        setData({
          ...data,
          backgroundFile: file,
          backgroundUrl: getFileUrl(file),
        });
      } else {
        alert('Please upload an image!');
      }
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
        const updatedHatches = data.hatches.map((hatch) => {
          if (hatch.num === currentHatch) {
            hatch.imageFile = file;
            hatch.imageUrl = getFileUrl(file);
          }
          return hatch;
        });
        setData({ ...data, hatches: updatedHatches });
      } else {
        alert('Please upload an image!');
      }
    }
  };
  // This toggles isOpen for the hatch with the given number
  // and updates the state accordingly
  // The hatches are open by default, and there's no restriction here
  const toggleHatch = (num: number) => {
    const updatedHatches = data.hatches.map((hatch) => {
      if (hatch.num === num) {
        hatch.isOpen = !hatch.isOpen;
      }
      return hatch;
    });
    setData({ ...data, hatches: updatedHatches });
  };
  // Manipulate the order of the hatches
  const handleRandomOrder = () => {
    const hatchesCopy = [...data.hatches];
    hatchesCopy.sort(() => Math.random() - 0.5);
    setData({ ...data, hatches: hatchesCopy });
  };
  const handleResetOrder = () => {
    const hatchesCopy = [...data.hatches];
    hatchesCopy.sort((a, b) => a.num - b.num);
    setData({ ...data, hatches: hatchesCopy });
  };
  // Toggle all hatches open/closed
  const handleToggleAll = () => {
    const toggleCriteria = !data.hatches[0].isOpen;
    const updatedHatches = data.hatches.map((hatch) => {
      hatch.isOpen = toggleCriteria;
      return hatch;
    });
    setData({ ...data, hatches: updatedHatches });
  };

  // SUBMIT
  // This function logs the current state of the data state
  // and prepares the data for the backend
  // It will be extended with a POST request, a message? and a redirect to the My Calendars page
  interface DataForBackend {
    // The calendar reference (calendar1) is hard coded for now, but it should be dynamic in the future
    calendar1: CalendarForBackend;
  }
  interface CalendarForBackend {
    title: string;
    backgroundFile: File | null;
    backgroundUrl: string;
    hatches: HatchForBackend[];
  }
  type HatchForBackend = {
    num: number;
    imageFile: File | null;
    imageUrl: string | null;
    isOpen: boolean;
  };

  const handleSubmit = async () => {
    const loadingToastId = toast.loading('Creating calendar...');

    // Log data state for testing purposes (data state is for the page, not for backend)
    console.log('Data state: ', data);

    // Build the data for the backend
    const calendar: CalendarForBackend = {
      title: data.title,
      backgroundFile: data.backgroundFile,
      backgroundUrl: '',
      hatches: [],
    };

    // Upload the background image to Firebase Storage and get the download URL
    if (data.backgroundFile) {
      const bgStorageRef = ref(storage, `images/${uid}/${data.backgroundFile.name}`);
      await uploadBytesResumable(bgStorageRef, data.backgroundFile);
      const bgUrl = await getDownloadURL(bgStorageRef);
      calendar.backgroundUrl = bgUrl;
    }

    // Upload the hatch images to Firebase Storage and get the download URLs
    const hatches = await Promise.all(
      data.hatches.map(async (hatch) => {
        if (hatch.imageFile) {
          const hatchStorageRef = ref(storage, `images/${uid}/${hatch.imageFile.name}`);
          await uploadBytesResumable(hatchStorageRef, hatch.imageFile);
          const hatchUrl = await getDownloadURL(hatchStorageRef);
          return {
            num: hatch.num,
            imageFile: hatch.imageFile,
            imageUrl: hatchUrl,
            isOpen: false,
          };
        } else {
          return {
            num: hatch.num,
            imageFile: null,
            imageUrl: null,
            isOpen: false,
          };
        }
      })
    );

    calendar.hatches = [...hatches];
    const dataForBackend: DataForBackend = { calendar1: calendar }; // calendar1 is hardcoded for now!!!
    // Log data for the backend for testing purposes
    console.log('Data for backend: ', dataForBackend);

    try {
      const response = await fetch(`http://localhost:8080/calendar/addcalendar/${uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForBackend),
      });

      if (!response.ok) {
        throw new Error('Failed to create calendar');
      }

      const responseData = await response.json();
      console.log(responseData);

      toast.update(loadingToastId, {
        render: 'Calendar created! Redirecting to My Calendars...',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
        onClose: () => router.push('/calendars'),
      });
    } catch (error) {
      console.error('Error creating calendar:', error);

      toast.update(loadingToastId, {
        render: 'Failed to create calendar',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  // Render nothing if the user is not logged in
  if (!isLoggedIn) {
    return null;
  }

  return (
    <main className="grid md:grid-cols-[300px_1fr] min-h-screen">
      {/* View navigation */}
      <div className="md:hidden flex flex-col gap-3 w-max fixed bottom-5 right-5 z-20">
        <a href="#settings" className="btn-main btn-sm">
          <FaArrowUpLong />
          <FaEdit />
        </a>
        <a href="#preview" className="btn-main btn-sm">
          <FaArrowDownLong />
          <FaCalendarDays />
        </a>
      </div>
      {/* Settings */}
      <section id="settings" className="flex flex-col gap-12 max-w-[300px] mx-auto py-8 px-4 bg-base text-white">
        {/* Title */}
        <div>
          <h2 className="text-xl mb-1">Title</h2>
          <input type="text" placeholder="Enter calendar title" className="input input-bordered w-full max-w-xs text-stone-900 bg-white" onChange={handleTitleChange} />
        </div>
        {/* Background */}
        <div>
          <h2 className="text-xl mb-1">Background</h2>
          <input type="file" className="file-input file-input-bordered w-full max-w-xs text-stone-900 bg-white" onChange={handleBgChange} />
        </div>
        {/* Hatches */}
        <div>
          <h2 className="text-xl mb-1">Hatches</h2>
          {/* Carousel */}
          <div className="bg-slate-500 p-3 flex flex-col gap-3 rounded">
            {/* Carousel navigation */}
            <div className="flex items-center justify-between gap-1">
              <button className="btn-main btn-narrow" onClick={() => handleCarouselNav('prev')}>
                &larr; prev
              </button>
              <p>{currentHatch}</p>
              <button className="btn-main btn-narrow" onClick={() => handleCarouselNav('next')}>
                next &rarr;
              </button>
            </div>
            {/* Carousel items */}
            <div>
              {data.hatches.map((hatch, index) => (
                <div key={hatch.num} className={hatch.num === currentHatch ? 'block' : 'hidden'}>
                  <input type="file" className="file-input file-input-bordered w-full max-w-xs text-stone-900 bg-white" onChange={handleHatchChange} />
                </div>
              ))}
            </div>
            {/* Hatch order buttons */}
            <div className="bg-slate-700 flex flex-col gap-3 text-center p-2 rounded">
              <h3>Hatch order</h3>
              <button className="btn-two btn-narrow" onClick={handleRandomOrder}>
                Randomize
              </button>
              <button className="btn-two btn-narrow" onClick={handleResetOrder}>
                Reset
              </button>
            </div>
            <div className="bg-slate-700 flex flex-col gap-3 text-center p-2 rounded">
              <h3>Open/Close hatches</h3>
              <button className="btn-two btn-narrow" onClick={handleToggleAll}>
                Toggle
              </button>
            </div>
          </div>
        </div>
        {/* Submit */}
        <button className="btn-main" onClick={handleSubmit}>
          Submit
        </button>
        {/* Cancel */}
        <Link className="btn-two" href="/calendars">
          Cancel
        </Link>
      </section>

      {/* Preview */}
      <section id="preview" className="pr-4">
        <Calendar title={data.title} backgroundUrl={data.backgroundUrl} hatches={data.hatches} toggleHatch={toggleHatch} />
      </section>

      <ToastContainer position="bottom-left" theme="dark" />
    </main>
  );
};

export default NewCalendarPage;
