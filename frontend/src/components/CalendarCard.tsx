import Image from 'next/image';
import { IoShareSocial } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

type CalendarCardProps = {
  id: string;
  title: string;
  backgroundUrl: string;
  handleAction: (id: string, action: string) => void;
};

const CalendarCard: React.FC<CalendarCardProps> = ({ id, title, backgroundUrl, handleAction }) => {
  const handleClick = (action: 'show' | 'share' | 'edit' | 'delete') => {
    handleAction(id, action);
  };

  return (
    <div className="card max-w-72 w-full bg-[#e2e8f0] shadow-xl p-4 grid grid-rows-[250px_auto] hover:scale-105 transition-transform">
      <figure>
        <button className="w-full h-full" onClick={() => handleClick('show')}>
          <Image src={backgroundUrl || '/cal-bg-img.jpg'} alt={title} width={320} height={320} className="rounded-xl object-cover object-center w-full h-full" />
        </button>
      </figure>
      <div className="card-body items-center">
        <h2 className="card-title text-lg pb-4 clr-base">{title}</h2>

        <div className="card-actions flex flex-wrap justify-center gap-4">
          <div className="tooltip tooltip-bottom" data-tip="share">
            <button className="btn-card" onClick={() => handleClick('share')}>
              <IoShareSocial fontSize={30} />
            </button>
          </div>
          <div className="tooltip tooltip-bottom" data-tip="edit">
            <button className="btn-card" onClick={() => handleClick('edit')}>
              <FaEdit fontSize={30} />
            </button>
          </div>
          <div className="tooltip tooltip-bottom" data-tip="delete">
            <button className="btn-card" onClick={() => handleClick('delete')}>
              <RiDeleteBin6Line fontSize={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
