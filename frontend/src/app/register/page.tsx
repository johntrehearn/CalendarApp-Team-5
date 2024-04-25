'use client';

import React from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { fontTitle } from '../utilities/font';
import { IoIosStar } from "react-icons/io";
import { useState } from 'react';
import axios from 'axios';


const RegisterPage = () => {

  const { login } = useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);

  const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(email, password, displayName);
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        // Send POST request to backend for user registration
        await axios.post("http://localhost:8080/auth/register", {
          email,
          password,
          displayName,
          status: "free",
        });

        // Set accountCreated to true upon successful registration
        setAccountCreated(true);
      } catch (error: any) {
        setErrorMessage(error.response.data.error);
        setIsRegistering(false);
      }
    }
  };

  return (
    <div>
      <div className='flex items-center justify-center'>
        <div className="card bg-[#e2e8f0] shadow-xl px-6 py-4 w-96">
          <div className='flex items-center justify-between'>
            <IoIosStar fontSize={30} />
            <div className={`${fontTitle} text-4xl text-[color:purple] text-current bg-[#e2e8f0]  my-8 text-center`}>Register</div>
            <IoIosStar fontSize={30} />
          </div>

          <form className="flex flex-col items-center gap-5">
            <input type="text" placeholder="Name" value={displayName} onChange={(e) => {
                      setDisplayName(e.target.value);
                    }} className="input input-bordered w-full max-w-xs bg-white"></input>
            <input type="text" placeholder="Email" value={email} onChange={(e) => {
                      setEmail(e.target.value);
                    }} className="input input-bordered w-full max-w-xs bg-white"></input>
            <input type="password" placeholder="Password" onChange={(e) => {
                      setPassword(e.target.value);
                    }} value={password} className="input input-bordered w-full max-w-xs bg-white"></input>
            <button onClick={handleSubmit} type="submit" className="bg-[#463AA2] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Submit</button>
          </form>
        </div>
      </div>
      <div>
        {accountCreated && <div className="text-green-500">Account created successfully!</div>}
      </div>
    </div >
  );    
};






export default RegisterPage;


