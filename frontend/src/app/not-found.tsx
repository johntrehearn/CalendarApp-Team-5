import Link from "next/link";

const PageNotFound: React.FC = () => {
  return (
    <main>
      <div className=" flex justify-center items-center h-screen py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="card lg:card-side shadow-xl  ">
            <div className="card-body clr-accent">
              <h2 className="card-title w-96 text-3xl">
                Lost in the North Pole: 404 - Page Not Found
              </h2>
              <p className="w-80">
                Looks like our webpage took a detour through Santa's workshop
                and got lost in the tinsel.
              </p>
              <div className="card-actions  flex justify-center">
                <Link href="/">
                  <button className="btn bg-accent">Go To Home</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PageNotFound;
