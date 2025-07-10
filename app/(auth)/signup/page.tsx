"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from 'next/image';
import Link from "next/link";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

export default function SignUpIndustrial() {
  const [loading, setLoading] = useState(null); // "client" | "worker" | null
  const router = useRouter();

  const handleNavigate = (path: string, role: string) => {
    setLoading(role);
    setTimeout(() => {
      router.push(path);
    }, 1000); // delay just for UI effect
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Section */}
        <div className="bg-green-50 flex items-center justify-center p-8 md:w-1/2">
          <Image
            src="/images/welcom.png"
            alt="Sign Up"
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>

        {/* Right Section */}
        <div className="w-full p-8 flex flex-col justify-center text-center md:w-1/2">
          <h2 className="text-3xl font-bold text-green-600 mb-6">Welcome</h2>

          {/* Client Button */}
          <button
            onClick={() => handleNavigate("/signUpClient", "client")}
            disabled={loading !== null}
            className={`w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            {loading === "client" ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Loding ...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"/></svg>
                <span className="ml-2">Client</span>
              </>
            )}
          </button>

          {/* Technical Button */}
          <button
            onClick={() => handleNavigate("/signUpIndustrial", "worker")}
            disabled={loading !== null}
            className={`w-full bg-green-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-700 transition flex items-center justify-center ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            {loading === "worker" ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Loding ...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20"><path fill="currentColor" d="M6 6a4 4 0 1 1 8 0a4 4 0 0 1-8 0m5.226 5H5.01A2 2 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797c.811.517 1.801.861 2.89 1.045a2.5 2.5 0 0 1 .71-2.123l2.317-2.317A4.54 4.54 0 0 1 11.226 11m4.666-1.976c.366.042.471.48.21.742l-.975.975a1.507 1.507 0 1 0 2.132 2.132l.975-.975c.261-.261.7-.156.742.21a3.518 3.518 0 0 1-4.676 3.723l-2.726 2.727a1.507 1.507 0 1 1-2.132-2.132l2.726-2.726a3.518 3.518 0 0 1 3.724-4.676"/></svg>
                <span className="ml-2">Technical</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
