"use client";

import React from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
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

    // Call the login function with the ID token and wait for it to complete
    await login(idToken);

    // Redirect the user to the home page
    router.replace("/calendars");
  };

  return (
    <main className="content-width flex items-center justify-center py-10">
      <div className="card bg-[#e2e8f0] shadow-xl px-5 py-10 max-w-96 w-full">
        <h2 className="text-center text-2xl clr-base mb-5">Log In</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5"
        >
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs text-stone-900 bg-white"
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs text-stone-900 bg-white"
          ></input>
          <button type="submit" className="btn-dark">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
