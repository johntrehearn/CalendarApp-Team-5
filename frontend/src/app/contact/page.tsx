import { fontTitle } from "../utilities/font";
const ContactPage = () => {
  /* const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //  form submission logic here
  }; */

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card w-80 bg-[#e2e8f0] shadow-xl px-6 py-4">
        <div className="text-center my-8">
          <h1 className="text-4xl font-bold text-purple-800">Contact Us</h1>
        </div>
        <form
          /*  onSubmit={handleSubmit} */
          className="flex flex-col items-center gap-5"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full max-w-xs"
          />
          <textarea
            placeholder="Your Message"
            className="input input-bordered w-full max-w-xs"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="btn hover:btn-outline font-normal text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
