"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/contexts/AuthContext";
import { RiMenu3Fill } from "react-icons/ri";
import { BiSolidCrown } from "react-icons/bi";
import { loadStripe } from "@stripe/stripe-js";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

type MenuItemsProps = {
  onUpgrade: () => void;
};

const MenuItems: React.FC<MenuItemsProps> = ({ onUpgrade }) => {
  const { isLoggedIn, logout, uid } = useAuthContext();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!uid) {
      return;
    }

    const db = getDatabase();
    const userRef = ref(db, `users/${uid}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.status) {
        setStatus(data.status);
      }
    });
  }, [uid]);

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

        {status !== "premium" && (
          <button onClick={onUpgrade} className="btn-main">
            <BiSolidCrown />
            Upgrade
          </button>
        )}

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
  const { uid } = useAuthContext();

  // Load Stripe for the upgrade button functionality (onUpgrade)
  const stripePromise = loadStripe(
    "pk_test_51P32IZP7WrlB8etaPVNy6JDje09m3bPMwZSGP8hshpC1yeJb3gdjvERDXogAzMCV7drtpA5RZjtrTTxRwS7W4Jup000Az51PZy"
  );

  const onUpgrade = async () => {
    // Wait for Stripe to initialize
    const stripe = await stripePromise;

    if (!stripe) {
      // Check if Stripe failed to initialize
      console.error("Stripe failed to initialize");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/auth/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: uid, // Pass the user ID to the backend to create a session for the user in the database. MUST BE PASSED!!!
            priceId: "price_1P32UrP7WrlB8etaGthoWBTY",
          }),
        }
      );
      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
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
            <MenuItems onUpgrade={onUpgrade} />
          </div>

          {/* Dropdown menu for small screens */}
          <div className="dropdown relative lg:hidden">
            {/* Hamburger icon */}
            <button className="btn-main-circle">
              <RiMenu3Fill />
            </button>
            {/* Menu items */}
            <div
              tabIndex={0}
              className="right-0 top-14 menu menu-sm dropdown-content z-[1] bg-base rounded-box w-52 flex flex-col items-stretch text-center gap-5 p-5 border-2 border-white"
            >
              <MenuItems onUpgrade={onUpgrade} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
