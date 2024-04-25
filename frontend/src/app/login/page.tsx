"use client";

import React from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { fontTitle } from "../utilities/font";
import { IoIosStar } from "react-icons/io";
import { doSignInWithEmailAndPassword } from "@/firebase/auth";

const LoginPage = () => {
  const { login } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the email and password from the input fields
    const email = (
      document.querySelector('input[type="text"]') as HTMLInputElement
    ).value;
    const password = (
      document.querySelector('input[type="password"]') as HTMLInputElement
    ).value;

    // Sign in the user with Firebase and get the ID token
    const userCredential = await doSignInWithEmailAndPassword(email, password);
    const idToken = await userCredential.user.getIdToken();

    // Call the login function with the ID token
    login(idToken);

    // Redirect the user to the home page
    router.replace("/calendars");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="card w-80 bg-[#e2e8f0] shadow-xl px-6 py-4">
        <div className="flex items-center justify-between">
          <IoIosStar fontSize={30} />
          <div
            className={`${fontTitle} text-4xl text-[color:purple] text-current bg-[#e2e8f0]  my-8 text-center`}
          >
            Log In
          </div>
          <IoIosStar fontSize={30} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5"
        >
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
          ></input>
          <button
            type="submit"
            className="btn hover:btn-outline font-normal text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
