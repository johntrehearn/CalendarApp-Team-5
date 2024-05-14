import React from 'react';
import Link from 'next/link';
import { BsInfoCircle } from 'react-icons/bs';

const PaymentSuccessPage = () => {
  return (
    <main className="content-width flex flex-col justify-center items-center py-10">
      <div role="alert" className="alert mx-auto max-w-[600px]">
        <BsInfoCircle className="clr-base text-3xl" />
        <span>Payment successful!</span>
        <div>
          <Link href="/" className="btn-two">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PaymentSuccessPage;
