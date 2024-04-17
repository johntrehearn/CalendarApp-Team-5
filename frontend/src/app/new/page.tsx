'use client';
import React, { useState } from 'react';
import Calendar from '@/components/Calendar';
import { FaEdit } from 'react-icons/fa';
import { FaArrowUpLong, FaArrowDownLong, FaCalendarDays } from 'react-icons/fa6';

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

// HELPER FUNCTIONS
// Extract url string from File object
const getFileUrl = (file: File) => URL.createObjectURL(file);

// Check if the file type is a safe image
const isSafeImageType = (fileType: string) => {
  const safeImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
  return safeImageTypes.includes(fileType);
};

// NEW CALENDAR PAGE
const NewCalendarPage = () => {
  // DATA STATE
  // It uses DataType defined above
  // Default values are mostly null or empty arrays so the user can fill them in
  // The hatches array is initialized with 24 (hardcoded) elements for now
  // and they are open by default for easier viewing
  const [data, setData] = useState<DataType>({
    title: '',
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
    setData({ ...data, title: event.target.value });
  };

  // SET BACKGROUND
  // This function updates the background image file and url in the state
  const handleBgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (isSafeImageType(file.type)) {
        setData({ ...data, backgroundFile: file, backgroundUrl: getFileUrl(file) });
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
    title: string;
    backgroundFile: File | null;
    hatches: HatchForBackend[];
  }
  type HatchForBackend = {
    num: number;
    imageFile: File | null;
    isOpen: boolean;
  };
  const handleSubmit = () => {
    console.log('Data state: ', data);
    const dataForBackend: DataForBackend = { title: data.title, backgroundFile: data.backgroundFile, hatches: [] };
    const hatchesForBackend = data.hatches.map((hatch) => ({ num: hatch.num, imageFile: hatch.imageFile, isOpen: false }));
    dataForBackend.hatches = [...hatchesForBackend];
    console.log('Data for backend: ', dataForBackend);
  };

  return (
    <main className="grid md:grid-cols-[300px_1fr] min-h-screen">
      {/* View navigation */}
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
          <input type="text" placeholder="Enter calendar title" className="input input-bordered w-full max-w-xs text-stone-900" onChange={handleTitleChange} />
        </div>
        {/* Background */}
        <div>
          <h2 className="text-3xl">Background</h2>
          <input type="file" className="file-input file-input-bordered w-full max-w-xs text-stone-900" onChange={handleBgChange} />
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
            <div>
              {data.hatches.map((hatch, index) => (
                <div key={hatch.num} className={index === currentHatch ? 'block' : 'hidden'}>
                  <input type="file" className="file-input file-input-bordered w-full max-w-xs text-stone-900" onChange={handleHatchChange} />
                </div>
              ))}
            </div>
            {/* Hatch order buttons */}
            <div className="bg-slate-700 flex flex-col gap-3 text-center p-2 rounded">
              <h3>Hatch order</h3>
              <button className="btn btn-warning btn-outline btn-sm" onClick={handleRandomOrder}>
                Randomize
              </button>
              <button className="btn  btn-warning btn-outline btn-sm" onClick={handleResetOrder}>
                Reset
              </button>
            </div>
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
      </section>

      {/* Preview */}
      <section id="preview">
        <Calendar title={data.title} backgroundUrl={data.backgroundUrl} hatches={data.hatches} toggleHatch={toggleHatch} />
      </section>
    </main>
  );
};

export default NewCalendarPage;
