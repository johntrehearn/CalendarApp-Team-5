function PaymentSuccessful() {
  return (
    <>
      <div className="flex justify-center bg-[#131625]">
        <div className="card w-96 glass ">
          <center>
            <h2 className="card-title">Payment Outcome</h2>
          </center>
          <figure>
            {/* <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="car!"
            /> */}
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
              <button className="btn bg-[#EFD7BB]">Go To Home</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PaymentSuccessful;
