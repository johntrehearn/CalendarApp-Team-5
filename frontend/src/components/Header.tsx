'use client';

import Link from 'next/link';
import { useState } from 'react';

type Props = {};

const MenuItems = () => {
  // !!! logIn and logOut functions are for testing purposes only!
  // !!! After authentication is ready, clean up the mock code below:
  // 1. logOut will be handled differently (in connection with the backend)
  // 2. Delete the onClick from the Log In and Sign Up links! logIn will be handled on the /register and /login pages
  // Login status will be stored in a global state to keep track easier.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logIn = () => {
    setIsLoggedIn(true);
  };
  const logOut = () => {
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    //  Items when user is logged IN
    return (
      <>
        <li>
          <Link href="/calendars" className="btn btn-sm btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            My Calendars
          </Link>
        </li>
        <li>
          <button onClick={logOut} className="btn btn-sm btn-outline btn-warning">
            Log Out
          </button>
        </li>
      </>
    );
  } else {
    // Items when user is logged OUT
    return (
      <>
        <li>
          <Link onClick={logIn} href="/register" className="btn btn-sm btn-warning">
            Sign Up
          </Link>
        </li>
        <li>
          <Link onClick={logIn} href="/login" className="btn btn-sm btn-outline btn-warning">
            Log In
          </Link>
        </li>
      </>
    );
  }
};

const Header = (props: Props) => {
  return (
    <header>
      <nav className="navbar bg-base-100">
        {/* NAVBAR LEFT SIDE */}
        <div className="navbar-start">
          {/* Logo */}
          <Link href="/" className="btn btn-ghost text-xl">
            Home
          </Link>
        </div>

        {/* NAVBAR RIGHT SIDE */}
        <div className="navbar-end">
          {/* Menu for larger screens */}
          <ul className="menu menu-horizontal px-1 hidden sm:flex gap-5">
            <MenuItems />
          </ul>

          {/* Dropdown menu for small screens */}
          <div className="dropdown relative sm:hidden">
            {/* Hamburger icon */}
            <button className="btn btn-ghost sm:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
            {/* Menu items */}
            <ul tabIndex={0} className="right-0 menu menu-sm dropdown-content z-[1] shadow bg-base-100 rounded-box w-52 gap-4">
              <MenuItems />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
