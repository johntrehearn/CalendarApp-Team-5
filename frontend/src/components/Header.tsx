'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuthContext } from '@/contexts/AuthContext';
import { FaCalendarDays } from 'react-icons/fa6';
import { RiMenu3Fill } from 'react-icons/ri';

const MenuItems = () => {
  const { isLoggedIn, logout } = useAuthContext();

  // Call the logout function when the logout button is clicked
  const handleLogout = () => {
    logout();
  };

  if (isLoggedIn) {
    //  Items when user is logged IN
    return (
      <>
        <Link href="/calendars" className="btn-main">
          <FaCalendarDays />
          My Calendars
        </Link>

        <button onClick={handleLogout} className="btn-two">
          Log Out
        </button>
      </>
    );
  } else {
    // Items when user is logged OUT
    return (
      <>
        <Link href="/register" className="btn-main">
          Register
        </Link>

        <Link href="/login" className="btn-two">
          Log In
        </Link>
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
          <Link href="/" className="btn-subtle flex items-center">
            <Image src="/logo.png" alt="logo" width={40} height={40} className="p-1" />
            <span className="clr-accent px-3">Home</span>
          </Link>
        </div>

        {/* NAVBAR RIGHT SIDE */}
        <div className="navbar-end">
          {/* Menu for larger screens */}
          <div className="menu menu-horizontal px-1 hidden sm:flex gap-5">
            <MenuItems />
          </div>

          {/* Dropdown menu for small screens */}
          <div className="dropdown relative sm:hidden">
            {/* Hamburger icon */}
            <button className="btn-main-circle">
              <RiMenu3Fill />
            </button>
            {/* Menu items */}
            <div tabIndex={0} className="right-0 top-14 menu menu-sm dropdown-content z-[1] bg-base rounded-box w-52 flex flex-col items-stretch gap-4 border-2 border-white">
              <MenuItems />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
