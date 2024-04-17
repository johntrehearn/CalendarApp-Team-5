'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuthContext } from '@/contexts/AuthContext';
import { FaCalendarDays } from 'react-icons/fa6';
import { RiMenu3Fill } from 'react-icons/ri';

const MenuItems = () => {
  // !!! logIn and logOut functions are for testing purposes only!
  // !!! After authentication is ready, clean up the mock code below:
  // 1. logOut will be handled differently (in connection with the backend)
  // 2. Delete the onClick from the Log In and Sign Up links! logIn will be handled on the /register and /login pages

  const { isLoggedIn, logout } = useAuthContext();

  // Call the logout function when the logout button is clicked
  const handleLogout = () => {
    logout();
  };

  if (isLoggedIn) {
    //  Items when user is logged IN
    return (
      <>
        <li>
          <Link href="/calendars" className="btn btn-link clr-accent hover:btn-outline font-normal text-lg">
            <FaCalendarDays />
            My Calendars
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="btn btn-outline clr-accent font-normal text-lg">
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
          <Link href="/register" className="btn bg-accent text-lg">
            Register
          </Link>
        </li>
        <li>
          <Link href="/login" className="btn btn-outline font-normal clr-accent text-lg">
            Log In
          </Link>
        </li>
      </>
    );
  }
};

const Header = () => {
  return (
    <header className="bg-base mb-5 py-3">
      <nav className="navbar content-width">
        {/* NAVBAR LEFT SIDE */}
        <div className="navbar-start">
          {/* Logo */}
          <Link href="/" className="btn btn-ghost clr-accent font-normal text-lg">
            <Image src="/logo.png" alt="logo" width={40} height={40} className="mr-4" />
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
            <button className="btn btn-circle text-lg bg-accent clr-base">
              <RiMenu3Fill />
            </button>
            {/* Menu items */}
            <ul tabIndex={0} className="right-0 top-14 menu menu-sm dropdown-content z-[1] bg-base rounded-box w-52 gap-4 border-2 border-white">
              <MenuItems />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
