import Link from "next/link";
import Image from "next/image";
import { ReactElement } from "react";

interface Props {}

const PageNotFound: React.FC<Props> = (): ReactElement => {
  return (
    <main>
      <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="card lg:card-side bg-base-100 shadow-xl ">
            <div className="card-body">
              <h2 className="card-title">There was the problem!</h2>
              <p>We could not find the page you are looking for.</p>
              <div className="card-actions justify-end">
                <p>
                  <Link href="/">
                    <button className="btn btn-primary">HomePage</button>
                  </Link>
                </p>
                <figure className="my-4 mx-4">
                  <Image
                    src="/image.jpg"
                    alt="Image"
                    width={400}
                    height={400}
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PageNotFound;
