import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ReactElement } from "react";

const PageNotFound: React.FC = () => {
  return (
    <main>
      <div className="relative isolate overflow-hidden bg-[#131625] py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="card lg:card-side shadow-xl  ">
            <div className="card-body text-[#EFD7BB]">
              <h2 className="card-title w-96 text-3xl">
                Lost in the North Pole: 404 - Page Not Found
              </h2>
              <p className="w-80">
                Looks like our webpage took a detour through Santa's workshop
                and got lost in the tinsel.
              </p>
              <div className="card-actions justify-end">
                <p>
                  <Link href="/">
                    <button className="btn bg-[#EFD7BB]">Go To Home</button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PageNotFound;
