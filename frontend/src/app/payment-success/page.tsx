'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsInfoCircle } from 'react-icons/bs';
import { parseCookies } from 'nookies';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from 'jwt-decode';
import axios from 'axios';

interface MyTokenPayload extends JwtPayload {
  userId: string;
}

const PaymentSuccessPage = () => {
  useEffect(() => {
    console.log('useEffect called');
    const refreshJWT = async () => {
      const cookies = parseCookies();
      console.log('Cookies:', cookies);
      if (cookies.jwt && typeof cookies.jwt === 'string') {
        console.log('JWT condition:', cookies.jwt && typeof cookies.jwt === 'string');
        const decodedToken = jwtDecode<MyTokenPayload>(cookies.jwt);
        const userId = decodedToken.userId;

        console.log('Making axios request');
        try {
          const response = await axios.post(
            'http://localhost:8080/auth/refresh-token',
            { userId },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true, // Include credentials here
            }
          );
          const data = response.data;
          console.log(data);
          // Set the new JWT as a cookie
          document.cookie = `jwt=${data.jwt}; path=/`;
          // The new JWT is now set as a cookie
        } catch (error) {
          console.error('Error during axios request:', error);
        }
      }
    };

    // Wait for 2 second before running refreshJWT
    setTimeout(refreshJWT, 2000);
  }, []);

  return (
    <main className="content-width flex flex-col justify-center items-center py-10">
      <div role="alert" className="alert mx-auto max-w-[600px]">
        <BsInfoCircle className="clr-base text-3xl" />
        <span>Payment successful!</span>
        <div>
          <Link href="/calendars" className="btn-two btn-narrow">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PaymentSuccessPage;
