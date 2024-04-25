import Image from 'next/image';
import { IoShareSocial } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

const CalendarCard = () => {
  return (
    <div className="card w-80 bg-[#e2e8f0] shadow-xl px-6 py-4">
      <figure>
        <Image
          src="http://source.unsplash.com/a-close-up-of-a-very-large-star-in-the-sky-HvYO12QeS5g?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          alt="Placeholder Calendar Picture"
          width={320}
          height={320}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-lg pb-4">Your Advent Calendar</h2>

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
