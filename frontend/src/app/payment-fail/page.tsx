import React from 'react';
import Link from 'next/link';
import { IoAlertCircleOutline } from 'react-icons/io5';

const PaymentFailPage = () => {
  return (
    <main className="content-width flex flex-col justify-center items-center py-10">
      <div role="alert" className="alert mx-auto max-w-[600px]">
        <IoAlertCircleOutline className="clr-base text-4xl" />
        <span>Payment failed. Check your data and try again later!</span>
        <div>
          <Link href="/" className="btn-two">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PaymentFailPage;
