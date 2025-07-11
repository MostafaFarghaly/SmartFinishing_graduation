"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { useToken } from '../../context/token_context';
import { useLoginClient } from "../../context/regester/login_context";
import {
  UserCircleIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const { userData, logOut } = useToken();
  const { saveData } = useLoginClient();

  const [isOpen, setIsOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  // حالة تحميل لكل زر/رابط
  const [loading, setLoading] = useState({
    requests: false,
    projects: false,
    account: false,
    support: false,
    logout: false,
    login: false,
    signup: false,
  });

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const role =
    userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";
  const isWorker = role.toLowerCase() === "worker";

  // دالة لتفعيل التحميل مؤقتاً (يمكن تستبدلها بعملية فعلية)
  function handleLoading(key) {
    setLoading(prev => ({ ...prev, [key]: true }));
    // كمثال، 1.5 ثانية تحميل ثم يرجع الوضع الطبيعي
    setTimeout(() => {
      setLoading(prev => ({ ...prev, [key]: false }));
    }, 1500);
  }

  // تعديل دالة تسجيل الخروج لتظهر التحميل
  function handleLogout() {
    setLoading(prev => ({ ...prev, logout: true }));
    Promise.resolve(logOut()) // افترض logOut ترجع Promise
      .finally(() => {
        setLoading(prev => ({ ...prev, logout: false }));
      });
  }

  return (
    <nav className="relative z-[10000] p-4 bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-md backdrop-blur-sm">
      <div className="container mx-auto flex flex-wrap lg:flex-nowrap justify-between items-center">
        
        {/* Logo */}
        <div className="flex justify-between items-center w-full lg:w-auto">
          <Link href="/" className="text-xl font-bold flex items-center">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="h-8 w-8 mr-2 rounded-md"
            />
            <span className="text-green-500">Smart Finishing</span>
          </Link>
          <button
            className="block lg:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Links */}
        {userData && (
          <div className={`lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'} w-full lg:block mt-4 lg:mt-0`}>
            <ul className="flex flex-col lg:flex-row lg:space-x-8 text-center">
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-green-400 px-3 py-1 rounded"
                  onClick={() => handleLoading('home')}
                >
                  Home
                </Link>
              </li>

              {/* Services Dropdown */}
              <li>
                <Link
                  href="/home/PopularServices"
                  className="text-white hover:text-green-400 px-3 py-1 rounded"
                  onClick={() => handleLoading('services')}
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  href="/home/ServiceSection"
                  className="text-white hover:text-green-400 px-3 py-1 rounded"
                  onClick={() => handleLoading('startProject')}
                >
                  Start Project
                </Link>
              </li>

              <li>
                <Link
                  href="/Aboutus"
                  className="text-white hover:text-green-400 px-3 py-1 rounded"
                  onClick={() => handleLoading('aboutUs')}
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-white hover:text-green-400 px-3 py-1 rounded"
                  onClick={() => handleLoading('contact')}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Right Section */}
        <div className={`lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'} w-full lg:block mt-4 lg:mt-0`} ref={dropRef}>
          {userData ? (
            <>
              <div className="flex gap-4 font-medium px-2">
                <Link
                  href="/requests"
                  className={`text-white hover:text-green-400 px-3 py-1 rounded ${loading.requests ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => handleLoading('requests')}
                >
                  {loading.requests ? <i className="fa fa-spinner fa-spin"></i> : 'Requests'}
                </Link>
                {!isWorker && (
                  <Link
                    href="/projects"
                    className={`text-white hover:text-green-400 px-3 py-1 rounded ${loading.projects ? 'opacity-50 pointer-events-none' : ''}`}
                    onClick={() => handleLoading('projects')}
                  >
                    {loading.projects ? <i className="fa fa-spinner fa-spin"></i> : 'Projects'}
                  </Link>
                )}
              </div>

              <div className="relative ml-4">
                <button
                  onClick={() => setDropOpen(!dropOpen)}
                  className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-opacity-90 focus:outline-none"
                >
                  <UserCircleIcon className="h-5 w-5" />
                  <span className="ml-2">{saveData.displayName.split(' ')[0]}</span>
                  <ChevronDownIcon className={`h-4 w-4 ml-1 transform transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] overflow-hidden text-black">
                    <Link
                      href="/account"
                      className={`flex items-center px-4 py-2 hover:bg-gray-100 ${loading.account ? 'opacity-50 pointer-events-none' : ''}`}
                      onClick={() => handleLoading('account')}
                    >
                      <UserCircleIcon className="h-5 w-5 mr-2 text-gray-600" /> {loading.account ? <i className="fa fa-spinner fa-spin"></i> : 'Account'}
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      disabled={loading.logout}
                      className={`w-full text-left flex items-center px-4 py-2 hover:bg-gray-100 ${loading.logout ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-gray-600" /> {loading.logout ? 'Logging out...' : 'Log out'}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center space-x-4">
              <Link
                href="/login"
                className={`px-4 py-2 border text-white rounded-md hover:bg-gray-100 ${loading.login ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => handleLoading('login')}
              >
                {loading.login ? <i className="fa fa-spinner fa-spin"></i> : 'Login'}
              </Link>
              <Link
                href="/signup"
                className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${loading.signup ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => handleLoading('signup')}
              >
                {loading.signup ? <i className="fa fa-spinner fa-spin"></i> : 'Sign Up'}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
