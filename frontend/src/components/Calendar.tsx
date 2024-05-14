'use client';

import Hatch from './Hatch/Hatch';
import { fontTitle } from '@/app/utilities/font';

interface CalendarProps {
  title: string;
  backgroundUrl: string | null | undefined;
  hatches: HatchType[];
  toggleHatch: (num: number) => void;
}
interface HatchType {
  num: number;
  imageUrl: string | null | undefined;
  isOpen: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ title, backgroundUrl, hatches, toggleHatch }) => {
  return (
    <div className="py-10 px-16 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'url("/cal-bg-img.jpg")' }}>
      <p className={`${fontTitle} w-fit text-center text-2xl bg-[white] clr-base py-2 px-8 rounded-lg mx-auto mb-10`}>{title}</p>
      <div className="flex gap-5 flex-wrap justify-center">
        {hatches.map((hatch) => (
          <Hatch key={hatch.num} num={hatch.num} isOpen={hatch.isOpen} imageUrl={hatch.imageUrl} toggleHatch={toggleHatch} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
