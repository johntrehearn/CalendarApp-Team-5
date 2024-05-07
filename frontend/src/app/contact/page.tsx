"use client";

import React from "react";

function ContactPage() {
  return (
    <div className="contact-container  flex justify-center items-center h-screen">
      <div className="contact-card bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-center mb-4">Contact Us</h1>
        <form className="contact-form" action="#" method="POST">
          <div className="form-group mb-4">
            <label htmlFor="name" className="block mb-1"></label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="email" className="block mb-1"></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="message" className="block mb-1"></label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message"
              rows={5}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 resize-y"
            ></textarea>
          </div>
          <button
            type="submit"
            className="sub bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
