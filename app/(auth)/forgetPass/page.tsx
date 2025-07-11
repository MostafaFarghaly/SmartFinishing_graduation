"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from 'next/image';
import React, { useState } from 'react';
import { useLoginClient } from '../../context/regester/login_context';

export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null); // لمعرفة نوع الرسالة
  const { forgotPassword } = useLoginClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await forgotPassword(email);
    setMessage(res.message);
    setSuccess(res.success);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div className="w-10/12 p-8">
          <h2 className="text-3xl font-bold my-text-green mb-2">Forgot Your Password?</h2>
          <p className="text-gray-600 mb-6">
            Don’t worry, it happens to all of us. Enter your email below to recover your password.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Submit
            </button>
          </form>

          {message && (
            <div className={`mt-4 text-sm text-center ${success ? "text-green-600" : "text-red-600"}`}>
              {message}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-green-50 flex items-center justify-center p-8">
          <Image
            src="/images/forget.png"
            alt="Forget Password"
            width={550}
            height={550}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
