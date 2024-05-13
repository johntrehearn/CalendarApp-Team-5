'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuthContext } from '@/contexts/AuthContext';
import { RiMenu3Fill } from 'react-icons/ri';
import { BiSolidCrown } from 'react-icons/bi';

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
        <Link href="/calendars" className="link-btn">
          My Calendars
        </Link>

        <Link href="/new" className="link-btn">
          New Calendar
        </Link>

        <Link href="/calendars" className="btn-main">
          <BiSolidCrown />
          Upgrade
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
    <header className="fixed top-0 left-0 z-10 w-full bg-base px-4">
      <nav className="navbar p-0">
        {/* NAVBAR LEFT SIDE */}
        <div className="navbar-start">
          {/* Logo */}
          <Link href="/" className="link-btn flex items-center">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
            <span className="clr-accent pl-3">Advent5Cal</span>
          </Link>
        </div>

        {/* NAVBAR RIGHT SIDE */}
        <div className="navbar-end">
          {/* Menu for larger screens */}
          <div className="menu menu-horizontal px-1 hidden lg:flex gap-5 items-center">
            <MenuItems />
          </div>

          {/* Dropdown menu for small screens */}
          <div className="dropdown relative lg:hidden">
            {/* Hamburger icon */}
            <button className="btn-main-circle">
              <RiMenu3Fill />
            </button>
            {/* Menu items */}
            <div tabIndex={0} className="right-0 top-14 menu menu-sm dropdown-content z-[1] bg-base rounded-box w-52 flex flex-col items-stretch text-center gap-5 p-5 border-2 border-white">
              <MenuItems />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
