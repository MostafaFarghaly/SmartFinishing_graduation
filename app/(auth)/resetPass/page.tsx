import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export default function ResetPass() {
return (
<div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
    {/* Left Section */}
    <div className="w-10/12 p-8">
        <h2 className="text-3xl font-bold my-text-green mb-2">Reset Password</h2>
        <p className="text-gray-600 mb-6">Don’t worry, happens to all of us. Enter your email below to recover your password</p>
        <form className="space-y-4">
        <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
        </div>
        <Link href="/login">
            <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors mt-4"
            >
            Submit
            </button>
        </Link>
        </form>
    </div>
    {/* Right Section */}
    <div className="w-1/2 bg-green-50 flex items-center justify-center p-8">
        <Image
        src="/images/resetpass.png"
        alt="Login"
        width={550}
        height={550}
        className="mx-auto"
        />
    </div>
    </div>
</div>
);
}
