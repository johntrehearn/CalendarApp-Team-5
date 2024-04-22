'use client';

import { useState, useEffect } from 'react';
import Calendar from '@/components/Calendar';

const SingleCalendarPage = () => {
  // For now, we'll use a hardcoded object or null for the fetched data
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
  // const fetchedCalData = null;

  // This will be an async function that fetches the calendar data from the backend
  // Data can be extracted from { calendar1: {< this is the data we need >} }
  /*
  const [calendarData, setCalendarData] = useState<{
    title: string;
    backgroundUrl: string;
    hatches: { num: number; imageUrl: string; isOpen: boolean }[];
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('API_URL_HERE');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCalendarData(data);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      }
    };

    fetchData();
  }, []);
  */

  // State for the calendar data
  const [calendarData, setCalendarData] = useState<{
    title: string;
    backgroundUrl: string;
    hatches: { num: number; imageUrl: string; isOpen: boolean }[];
  } | null>(fetchedCalData);

  // Function to toggle the hatch open/closed
  // It is restricted to only open hatches that fit the criteria
  // ALSO UPDATE THE BACKEND? When should it happen?
  const toggleHatch = (hatchNum: number) => {
    // Do nothing if there is no calendar data
    if (!calendarData) {
      return;
    }
    // Get the current month and day
    // To test, write "2024-12-24" inside newDate()
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    // Set the criteria for opening a hatch
    // Has to be december, and the hatch number has to be less than or equal to the current day
    // If it's past december 24, all hatches can be opened (but still has to be december)
    const isDecember = currentMonth === 12;
    const isAdventDay = hatchNum <= currentDay && isDecember;
    const isPastDec24 = isDecember && currentDay > 24;

    // Init the variable to check if the hatch can be opened
    let canOpenHatch = false;
    // Set the variable to true if the hatch can be opened
    if (isPastDec24 || isAdventDay) {
      canOpenHatch = true;
    }

    // If the hatch can't be opened, show an alert and return
    if (!canOpenHatch) {
      alert("You can't open this hatch yet!");
      return;
    }

    // If the hatch can be opened, toggle the hatch and update the state
    const updatedHatches = calendarData.hatches.map((hatch) => {
      if (hatch.num === hatchNum) {
        return { ...hatch, isOpen: !hatch.isOpen };
      }
      return hatch;
    });
    setCalendarData({
      ...calendarData,
      hatches: updatedHatches,
    });
  };

  // Function to handle the share button
  // Maybe it could open a modal with a link to the calendar? Or copy the link to the clipboard?
  const handleShare = () => {
    console.log('Share button clicked');
  };

  // Without calendar data, show a loading message
  // Also error message if the calendar doesn't exist?
  return (
    <div>
      {calendarData && (
        <div>
          <Calendar title={calendarData.title} backgroundUrl={calendarData.backgroundUrl} hatches={calendarData.hatches} toggleHatch={toggleHatch} />
          <button className="btn bg-accent fixed bottom-5 right-5 z-10" onClick={handleShare}>
            Share
          </button>
        </div>
      )}

      {!calendarData && <p>Loading...</p>}
    </div>
  );
};

export default SingleCalendarPage;
