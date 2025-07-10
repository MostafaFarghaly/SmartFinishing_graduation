"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomeCleaningSlider({ category, services }) {
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w < 640) setSlidesPerView(1);
      else if (w < 768) setSlidesPerView(2);
      else if (w < 1024) setSlidesPerView(3);
      else setSlidesPerView(4);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showArrows = services.length > slidesPerView;

  const handlePrev = () => setStart((prev) => Math.max(0, prev - 1));
  const handleNext = () => setStart((prev) => Math.min(services.length - slidesPerView, prev + 1));
  const handleViewAll = () => {
    setLoading(true);
    router.push("/allservices");
  };

  return (
    <div className="mb-20 px-4 sm:px-6 text-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">Popular Services</h2>
        <p className="mb-6 text-gray-600">
          Enjoy a clean and healthy home with our services and get rid of dust and bacteria!
        </p>
        <div className="relative">
          {/* Arrows for large screens */}
          {showArrows && (
            <>
              <button
                onClick={handlePrev}
                className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 disabled:opacity-30 transition-all duration-300 hover:scale-110 hidden sm:flex items-center justify-center w-10 h-10"
                disabled={start === 0}
              >
                <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 disabled:opacity-30 transition-all duration-300 hover:scale-110 hidden sm:flex items-center justify-center w-10 h-10"
                disabled={start >= services.length - slidesPerView}
              >
                <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Cards */}
          <div className="flex flex-wrap justify-center gap-6">
            {services.slice(start, start + slidesPerView).map((service, i) => (
              <div
                key={i}
                className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative"
              >
                <div className="relative w-72 aspect-square overflow-hidden">
                  <Image
                    src={service.img || "/images/service-placeholder.jpg"}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-200 text-center">
                    {service.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Arrows */}
          {showArrows && slidesPerView === 1 && (
            <div className="flex justify-center gap-4 mt-6 sm:hidden">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-30 transition-all"
                disabled={start === 0}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-30 transition-all"
                disabled={start >= services.length - 1}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* View All Services button */}
        <div className="flex justify-center mt-10">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 disabled:opacity-50"
            onClick={handleViewAll}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Loading...
              </span>
            ) : (
              <>
                View All Services
                <span className="text-xl transition-transform hover:translate-x-1">&#8594;</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
