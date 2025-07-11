"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

interface Service {
  id: number;
  name: string;
  img: string;
  // أضف أي خصائص أخرى حسب هيكل البيانات الفعلي
}

interface HomeCleaningSliderProps {
  category: string;
  services: Service[];
}

export default function HomeCleaningSlider({
  category,
  services,
}: HomeCleaningSliderProps) {
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [start, setStart] = useState(0);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const router = useRouter();
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 768) {
        setSlidesPerView(2);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(4);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showArrows = services.length > slidesPerView;

  const handlePrev = () => {
    setStart((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStart((prev) => Math.min(services.length - slidesPerView, prev + 1));
  };

  const handleImageClick = (id: number) => {
    setLoadingId(id);
    setTimeout(() => {
      router.push(`/gosearch/${id}`);
    }, 400);
  };

  return (
    <div className="mb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">{category}</h2>
        <p className="mb-6 text-gray-600">
          Enjoy a clean and healthy home with our services and get rid of dust and bacteria!
        </p>

        <div className="relative">
          {/* Arrows */}
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

          {/* Grid Cards */}
          <div
            className={`grid gap-6 ${
              services.length < slidesPerView
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {services.slice(start, start + slidesPerView).map((service, i) => (
              <div
                key={i}
                className="group bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative"
                onClick={() => handleImageClick(service.id)}
              >
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={service.img || "/images/service-placeholder.jpg"}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {loadingId === service.id && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-white border-gray-300"></div>
                      <p className="text-white text-sm mt-2">Loading...</p>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-200 text-center">
                    {service.name}
                  </h3>
                  <div className="mt-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center text-sm text-green-600 font-medium">
                      Book Now
                      <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Arrows */}
          {showArrows && (
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
                disabled={start >= services.length - slidesPerView}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
