'use client';

import React from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { fontTitle } from '../utilities/font';

import { IoIosStar } from "react-icons/io";

type Props = {};

const LoginPage = (props: Props) => {
  const { login } = useAuthContext();
  const router = useRouter();

  // !!! handleSubmit function is for testing purposes only!
  // For now it's not real authentication, just a mock function.
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login();
    router.replace('/calendars');
  };

  return (
    <div className='h-screen flex items-center justify-center'>

      <div className="card w-80 bg-[#e2e8f0] shadow-xl px-6 py-4">

        <div className='flex items-center justify-between justify-center '>

          <div>
            <IoIosStar fontSize={30} />
          </div>
          <div className={`${fontTitle} text-4xl text-[color:purple] text-current bg-[#e2e8f0]  my-8 text-center`}>Log In</div>
          <div>
            <IoIosStar fontSize={30} />
          </div>

        </div>

        <form className="flex flex-col items-center gap-5">
          <input type="text" placeholder="Email" className="input input-bordered w-full max-w-xs"></input>
          <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs"></input>
          <button onClick={handleSubmit} type="submit" className="btn hover:btn-outline font-normal text-lg">
            Submit
          </button>
        </form>
      </div>
    </div >
  );
};

export default LoginPage;
