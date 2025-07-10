"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import { useToken } from "../../context/token_context";
import { useLoginClient } from "../../context/regester/login_context";
import {
  UserCircleIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";

export default function MinimalNavbar() {
  const { userData, logOut } = useToken();
  const { saveData } = useLoginClient();
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  const [loadingBtn, setLoadingBtn] = useState({
    requests: false,
    projects: false,
    account: false,
    support: false,
    logout: false,
    login: false,
    signup: false,
  });

  const role =
    userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";
  const isCustomer = role.toLowerCase() === "customer";
  const isWorker = role.toLowerCase() === "worker";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoading = (key) => {
    setLoadingBtn((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setLoadingBtn((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const handleLogout = () => {
    setLoadingBtn((prev) => ({ ...prev, logout: true }));
    Promise.resolve(logOut()).finally(() =>
      setLoadingBtn((prev) => ({ ...prev, logout: false }))
    );
  };

  return (
    <nav className="w-full bg-white shadow-md z-[9999]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center p-4 gap-4 md:gap-0">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold flex items-center">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="h-8 w-8 mr-2"
          />
          <span className="text-green-500">Smart Finishing</span>
        </Link>

        {/* Right section */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6" ref={dropRef}>
          {userData ? (
            <>
              <div className="flex gap-4 font-medium">
                <Link
                  href="/requests"
                  className={`hover:text-green-500 px-3 py-1 ${
                    loadingBtn.requests ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={() => handleLoading("requests")}
                >
                  {loadingBtn.requests ? <i className="fa fa-spinner fa-spin"></i> : "Requests"}
                </Link>
                {!isWorker && (
                  <Link
                    href="/projects"
                    className={`hover:text-green-500 px-3 py-1 ${
                      loadingBtn.projects ? "opacity-50 pointer-events-none" : ""
                    }`}
                    onClick={() => handleLoading("projects")}
                  >
                    {loadingBtn.projects ? <i className="fa fa-spinner fa-spin"></i> : "Projects"}
                  </Link>
                )}
              </div>

              {/* Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropOpen(!dropOpen)}
                  className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
                >
                  <UserCircleIcon className="h-5 w-5" />
                  <span className="ml-2 hidden sm:inline-block">
                    {saveData?.displayName?.split(" ")[0] || "User"}
                  </span>
                  <ChevronDownIcon
                    className={`h-4 w-4 ml-1 transform transition-transform ${
                      dropOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-[99999] overflow-hidden text-black">
                    <Link
                      href="/account"
                      className={`flex items-center px-4 py-2 hover:bg-gray-100 ${
                        loadingBtn.account ? "opacity-50 pointer-events-none" : ""
                      }`}
                      onClick={() => handleLoading("account")}
                    >
                      <UserCircleIcon className="h-5 w-5 mr-2 text-gray-600" />
                      {loadingBtn.account ? (
                        <i className="fa fa-spinner fa-spin"></i>
                      ) : (
                        "Account"
                      )}
                    </Link>
                    <Link
                      href="/support"
                      className={`flex items-center px-4 py-2 hover:bg-green-50 ${
                        loadingBtn.support ? "opacity-50 pointer-events-none" : ""
                      }`}
                      onClick={() => handleLoading("support")}
                    >
                      <LifebuoyIcon className="h-5 w-5 mr-2 text-green-600" />
                      {loadingBtn.support ? (
                        <i className="fa fa-spinner fa-spin"></i>
                      ) : (
                        "Support"
                      )}
                    </Link>
                    <button
                      onClick={handleLogout}
                      disabled={loadingBtn.logout}
                      className={`w-full text-left flex items-center px-4 py-2 hover:bg-gray-100 ${
                        loadingBtn.logout ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-gray-600" />
                      {loadingBtn.logout ? "Logging out..." : "Log out"}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link
                href="/login"
                className={`px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 ${
                  loadingBtn.login ? "opacity-50 pointer-events-none" : ""
                }`}
                onClick={() => handleLoading("login")}
              >
                {loadingBtn.login ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
              </Link>
              <Link
                href="/signup"
                className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${
                  loadingBtn.signup ? "opacity-50 pointer-events-none" : ""
                }`}
                onClick={() => handleLoading("signup")}
              >
                {loadingBtn.signup ? <i className="fa fa-spinner fa-spin"></i> : "Sign Up"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
