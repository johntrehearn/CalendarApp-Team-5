'use client';

import React from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { fontTitle } from '../utilities/font';
import { IoIosStar } from 'react-icons/io';
import { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const { login } = useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isRegistering) {
      if (password !== confirmPassword) {
        // Check if passwords match before sending request to backend
        setErrorMessage('Passwords do not match'); // Set error message if passwords do not match
        return;
      }
      setIsRegistering(true);
      try {
        // Send POST request to backend for user registration
        await axios.post('http://localhost:8080/auth/register', {
          email,
          password,
          displayName,
          status: 'free',
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
    <main className="content-width flex items-center justify-center py-10">
      <div className="card bg-[#e2e8f0] shadow-xl px-5 py-10 max-w-96 w-full">
        <h2 className="text-center text-2xl clr-base mb-5">Register</h2>

        <form className="flex flex-col items-center gap-5">
          <input
            type="text"
            placeholder="Name"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
            className="input input-bordered w-full max-w-xs text-stone-900 bg-white"
          ></input>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="input input-bordered w-full max-w-xs text-stone-900 bg-white"
          ></input>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className="input input-bordered w-full max-w-xs text-stone-900 bg-white"
          ></input>
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
            className="input input-bordered w-full max-w-xs text-stone-900 bg-white"
          ></input>
          <button onClick={handleSubmit} type="submit" className="btn-two">
            Submit
          </button>
        </form>
      </div>

      <div>{errorMessage && <div className="text-red-500">{errorMessage}</div>}</div>
      <div>{accountCreated && <div className="text-green-500">Account created successfully!</div>}</div>
    </main>
  );
};

export default RegisterPage;
