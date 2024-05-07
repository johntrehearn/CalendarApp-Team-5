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
    <div>
      <div className="p-10 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'none' }}>
        <p className={`${fontTitle} w-max text-center text-3xl m-5 bg-[white] clr-base py-3 px-10 rounded-lg mx-auto mb-10`}>{title}</p>
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
