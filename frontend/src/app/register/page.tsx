'use client';

import React from 'react';

type Props = {};

const RegisterPage = (props: Props) => {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <div>
      <h2 className="my-8 text-2xl text-center">Register</h2>
      <form className="flex flex-col items-center gap-5">
        <input type="text" placeholder="Email" className="input input-bordered w-full max-w-xs"></input>
        <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs"></input>
        <input type="password" placeholder="Confirm Password" className="input input-bordered w-full max-w-xs"></input>
        <button onClick={handleSubmit} type="submit" className="btn ">
          Send
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
