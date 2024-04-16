'use client';

import { useState } from 'react';
import Hatch from './Hatch/Hatch';

interface HatchType {
  num: number;
  imageUrl: string | null | undefined;
  isOpen: boolean;
}

const Calendar: React.FC = () => {
  const [hatches, setHatches] = useState<HatchType[]>([
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
  ]);

  const toggleHatch = (num: number) => {
    setHatches(
      hatches.map((hatch) => {
        if (hatch.num === num) {
          return { ...hatch, isOpen: !hatch.isOpen };
        }
        return hatch;
      })
    );
  };

  // Backgrounds to test:
  // https://images.pexels.com/photos/66284/winter-nature-season-trees-66284.jpeg
  // https://images.pexels.com/photos/1028723/pexels-photo-1028723.jpeg
  // https://images.pexels.com/photos/18512842/pexels-photo-18512842/free-photo-of-autumn-forest-at-night.jpeg

  return (
    <div>
      <div className="p-10 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://images.pexels.com/photos/18512842/pexels-photo-18512842/free-photo-of-autumn-forest-at-night.jpeg)' }}>
        <p className={`w-max text-center text-3xl m-5 bg-[white] py-3 px-10 rounded-lg mx-auto mb-10`}>Advent Calendar</p>
        <div className="flex gap-5 flex-wrap justify-center">
          {hatches.map((hatch) => (
            <Hatch key={hatch.num} num={hatch.num} isOpen={hatch.isOpen} imageUrl={hatch.imageUrl} toggleHatch={toggleHatch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
