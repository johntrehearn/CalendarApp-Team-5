import Image from 'next/image';
import { IoShareSocial } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

type CalendarCardProps = {
  title: string;
  imageUrl: string;
};

const CalendarCard: React.FC<CalendarCardProps> = ({ title, imageUrl }) => {
  return (
    <div className="card w-80 bg-[#e2e8f0] shadow-xl px-6 py-4 grid grid-rows-[1.5fr_1fr]">
      <figure>
        <Image src={imageUrl} alt={title} width={320} height={320} className="rounded-xl object-cover object-center w-full h-full" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-lg pb-4">{title}</h2>

        <div className="card-actions flex gap-5">
          <button className="btn btn-square btn-outline">
            <IoShareSocial fontSize={30} />
          </button>
          <button className="btn btn-square btn-outline">
            <FaEdit fontSize={30} />
          </button>
          <button className="btn btn-square btn-outline" style={{ background: 'pink' }}>
            <RiDeleteBin6Line fontSize={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
