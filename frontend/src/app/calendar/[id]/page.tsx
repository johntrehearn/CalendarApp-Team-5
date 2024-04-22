'use client';

import { useState } from 'react';
import Calendar from '@/components/Calendar';

type Props = {};

const SingleCalendarPage = (props: Props) => {
  // This will be an async function that fetches the calendar data from the backend, e.g.
  /*
  const handleFetchCalendarData = () => {
    const fetchedCalData = await fetch('http://localhost:3000/api/calendar/1');
    setCalendarData(fetchedCalData.calendar1);
  };
  */
  // Call the function in an event handler or JSX attribute
  // handleFetchCalendarData();

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

  const [data, setData] = useState(fetchedCalData);

  const toggleHatch = (num: number) => {
    const updatedHatches = data.hatches.map((hatch) => {
      if (hatch.num === num) {
        hatch.isOpen = !hatch.isOpen;
      }
      return hatch;
    });
    setData({ ...data, hatches: updatedHatches });
  };

  return <Calendar title={data.title} backgroundUrl={data.backgroundUrl} hatches={data.hatches} toggleHatch={toggleHatch} />;
};

export default SingleCalendarPage;
