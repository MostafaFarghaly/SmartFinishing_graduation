"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from 'next/image';
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLoginClient } from "../../context/regester/login_context";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const { resetPassword } = useLoginClient();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !token) {
      setSuccess(false);
      setMessage("Invalid or missing email/token parameters.");
      return;
    }

    const result = await resetPassword({
      email,
      token,
      newPassword,
      confirmPassword,
    });

    setSuccess(result.success);
    setMessage(result.message);

    if (result.success) {
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div className="w-10/12 p-8">
          <h2 className="text-3xl font-bold my-text-green mb-2">Reset Password</h2>
          <p className="text-gray-600 mb-6">
            Please enter your new password below.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors mt-4"
            >
              Submit
            </button>
          </form>

          {message && (
            <p className={`mt-4 text-sm text-center ${success ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-green-50 flex items-center justify-center p-8">
          <Image
            src="/images/resetpass.png"
            alt="Reset Password"
            width={550}
            height={550}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
