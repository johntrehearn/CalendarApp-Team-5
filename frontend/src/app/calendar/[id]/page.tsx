'use client';

import { useState, useEffect } from 'react';
import Calendar from '@/components/Calendar';

const SingleCalendarPage = () => {
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

  const [calendarData, setCalendarData] = useState(fetchedCalData);

  const toggleHatch = (hatchNum: number) => {
    if (calendarData) {
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
    }
  };

  return (
    <div>
      {calendarData ? <Calendar title={calendarData.title} backgroundUrl={calendarData.backgroundUrl} hatches={calendarData.hatches} toggleHatch={toggleHatch} /> : <p>Loading...</p>}
      <button className="btn">Share</button>
    </div>
  );
};

export default SingleCalendarPage;
