"use client";
import "./success.css";
import Link from "next/link";
import { FcCheckmark } from "react-icons/fc";

function PaymentSuccessful() {
  return (
    <>
      <div className=" min-h-screen flex justify-center success-card">
        <div className="card w-96 h-80 mt-40 glass ">
          <figure>
            <FcCheckmark size={100} />
          </figure>

          <div className="card-body">
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Payment confirmed! Receipt Sent to email</span>
            </div>
            <div className="card-actions justify-end">
              <Link href="/">
                <button className="btn  bg-accent">Go To Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PaymentSuccessful;
