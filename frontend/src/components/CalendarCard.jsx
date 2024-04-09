import Image from 'next/image';
import { IoShareSocial } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";




const CalendarCard = () => {
    return (


        <div className="card w-96 bg-base-100 shadow-xl" style={{ background: "lightgrey" }}>
            <figure className="px-10 pt-10">
                <Image src="http://source.unsplash.com/a-close-up-of-a-very-large-star-in-the-sky-HvYO12QeS5g?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" alt="A close-up of a very large star in the sky" width={320} height={220} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">Your Advent Calendar</h2>

                <div className="card-actions" class="flex space-x-12 ...">

                    <button className="btn btn-square btn-outline">
                        <IoShareSocial fontSize={30} />

                    </button>
                    <button className="btn btn-square btn-outline">
                        <FaEdit fontSize={30} />
                    </button>
                    <button className="btn btn-square btn-outline" style={{ background: "pink" }}>
                        <RiDeleteBin6Line fontSize={30} />
                    </button>

                </div>
            </div>
        </div >

    );
};

export default CalendarCard;