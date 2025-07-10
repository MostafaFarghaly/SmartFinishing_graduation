"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useToken } from "../../context/token_context";

const customerSteps = [
  {
    icon: "/images/choose-service.png",
    title: "Choose Your Service",
    desc: "Select the type of work you need, such as plumbing, carpentry, painting, or more.",
    dotColor: "bg-purple-400",
    bg: "bg-purple-100",
  },
  {
    icon: "/images/define-space.png",
    title: "Define Your Space",
    desc: "Pick your apartment type and size so we understand your environment.",
    dotColor: "bg-green-400",
    bg: "bg-green-100",
  },
  {
    icon: "/images/set-style.png",
    title: "Set Your Style and Budget",
    desc: "Tell us your preferred design style and how much you plan to spend.",
    dotColor: "bg-pink-200",
    bg: "bg-pink-100",
  },
  {
    icon: "/images/add-details.png",
    title: "Add Project Details",
    desc: "Upload reference images and describe your needs in your own words.",
    dotColor: "bg-violet-400",
    bg: "bg-violet-100",
  },
  {
    icon: "/images/send-professional.png",
    title: "Send to a Professional",
    desc: "We'll match your project with the right expert near your location.",
    dotColor: "bg-pink-300",
    bg: "bg-pink-100",
  },
];

const workerSteps = [
  {
    icon: "/images/choose-service.png",
    title: "Select the services you offer",
    desc: "such as plumbing, painting, carpentry, or electrical work.",
    bg: "bg-purple-100",
    dot: "bg-purple-400",
  },
  {
    icon: "/images/define-space.png",
    title: "Location",
    desc: "Select your business area",
    bg: "bg-green-100",
    dot: "bg-green-400",
  },
  {
    icon: "/images/set-style.png",
    title: "Set Your Budget",
    desc: "How much money",
    bg: "bg-pink-100",
    dot: "bg-pink-200",
  },
];

const ServiceSection = () => {
  const { userData } = useToken();
  const [loading, setLoading] = useState(false);

  const handleStartClick = (href: string) => {
    setLoading(true);
    window.location.href = href;
  };

  const role =
    userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
    "Customer";

  if (role === "Customer") {
    return (
      <section className="bg-white py-16 px-4" id="service-section">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">Start Your Project Today</h2>
          <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
            Whether you’re renovating your home or furnishing a new apartment,
            follow these simple steps to connect with top professionals.
          </p>

          <div className="relative flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full mb-16 justify-items-center">
              {customerSteps.slice(0, 3).map((step, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center relative text-center max-w-xs"
                >
                  <div className={`mb-4 w-[80px] h-[80px] flex items-center justify-center rounded-xl shadow-md ${step.bg}`}>
                    <Image src={step.icon} alt={step.title} width={60} height={60} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                  <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${step.dotColor}`}></span>
                  {idx < 2 && (
                    <span className="absolute top-10 right-[-60px] w-[120px] h-0.5 border-t-2 border-dotted border-gray-300 hidden md:block"></span>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full justify-items-center">
              {customerSteps.slice(3).map((step, idx) => (
                <div key={idx} className="flex flex-col items-center relative text-center max-w-xs">
                  <div className={`mb-4 w-[80px] h-[80px] flex items-center justify-center rounded-xl shadow-md ${step.bg}`}>
                    <Image src={step.icon} alt={step.title} width={60} height={60} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                  <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${step.dotColor}`}></span>
                  {idx === 0 && (
                    <span className="absolute top-10 right-[-60px] w-[120px] h-0.5 border-t-2 border-dotted border-gray-300 hidden sm:block"></span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <button
              className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full shadow transition disabled:opacity-60"
              onClick={() => handleStartClick("/startProject")}
              disabled={loading}
            >
              <span className="text-xl">&#8592;</span>
              <span>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Start a new project"
                )}
              </span>
              <span className="text-xl">&#8594;</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // تصميم الصنايعي
  return (
    <section className="bg-white py-16 px-4" id="service-section">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">Start Receiving Projects Today</h2>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
          Whether you’re a plumber, carpenter, painter or handyman — get connected with clients and grow your business.
        </p>
        <div className="relative flex flex-wrap md:flex-nowrap items-start justify-center gap-12 mb-12">
        {workerSteps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center relative max-w-xs mx-auto">
            <div className={`mb-4 w-[70px] h-[70px] flex items-center justify-center rounded-xl shadow-md ${step.bg}`}>
                <Image src={step.icon} alt={step.title} width={60} height={60} />
            </div>
            <h3 className="font-semibold text-base mb-1">{step.title}</h3>
            <p className="text-gray-500 text-sm">{step.desc}</p>

            {/* Dot */}
            <span
                className={`absolute hidden md:block top-[35px] right-[-30px] w-2 h-2 rounded-full ${step.dot}`}
            ></span>

            {/* Dotted Line */}
            {idx < workerSteps.length - 1 && (
                <span className="hidden md:block absolute top-[39px] right-[-60px] w-[120px] h-0.5 border-t-2 border-dotted border-gray-300"></span>
            )}
            </div>
        ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full shadow transition disabled:opacity-60"
            onClick={() => handleStartClick("/requests")}
            disabled={loading}
          >
            <span className="text-xl">&#8594;</span>
            <span>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Loading...
                </span>
              ) : (
                "Start a new Job"
              )}
            </span>
            <span className="text-xl">&#8592;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
