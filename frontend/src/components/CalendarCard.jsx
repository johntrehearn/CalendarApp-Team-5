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

        // <div className="py-20 max-w-7xl mx-auto">
        //     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        //         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        //             <div className="bg-gray-200 text-lg font-bold p-4">Advent Calendar 1</div>
        //             <div className="p-4">
        //                 <Image src="http://source.unsplash.com/a-close-up-of-a-very-large-star-in-the-sky-HvYO12QeS5g?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" alt="A close-up of a very large star in the sky" width={320} height={220} />
        //                 <p>Advent Calendar 1 is a personalized online advent calendar that you can use to create a unique experience for your friends and family.</p>

        //             </div>
        //         </div>



        //         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        //             <div className="bg-gray-200 text-lg font-bold p-4">Advent Calendar 2</div>
        //             <div className="p-4">
        //                 <p>Advent Calendar 2 is a personalized online advent calendar that you can use to create a unique experience for your friends and family.</p>
        //             </div>
        //         </div>

        //         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        //             <div className="bg-gray-200 text-lg font-bold p-4">Advent Calendar 3</div>
        //             <div className="p-4">
        //                 <p>Advent Calendar 3 is a personalized online advent calendar that you can use to create a unique experience for your friends and family.</p>
        //             </div>
        //         </div>
        //     </div>
        // </div >


        // <div className="card bg-base-100 shadow-xl">
        //     <figure className="px-10 pt-10">
        //         <img src={image} alt={title} className="rounded-xl" />
        //     </figure>
        //     <div className=" card-body items-center text-center">
        //         <h2 className="card-title text-white">
        //             {title}
        //             <div className="badge badge-secondary text-xs">{category}</div>
        //         </h2>
        //         <p>{author}</p>
        //         <p className="text-lg font-medium">{price}</p>
        //         <div className="card-actions">
        //             <button className="btn btn-primary">Add to cart</button>



        //         </div>
        //     </div>
        // </div>
    );
};

export default CalendarCard;