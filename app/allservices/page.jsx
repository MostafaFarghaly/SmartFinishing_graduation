"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "../components/Nav/page";
import Footer from "../components/Footer/page";
import HomeCleaningSlider from "../components/HomeCleaningSlider";
import { useApi } from "../context/ApiContext";

const CleaningServicesBanner = () => (
  <div
    className="relative w-full h-[380px] flex items-center bg-cover bg-center"
    style={{
      backgroundImage: "url(/images/allservicesBackground.png)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    <div className="relative z-10 text-white px-6 max-w-2xl">
      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-base font-medium">
        Integrated Home Solutions
      </span>
      <h1 className="text-3xl font-bold mt-3">
        Discover LOGO Distinctive Services
      </h1>
      <p className="mt-2 text-base leading-relaxed">
        Master Clean provides you with integrated home solutions, where quality meets professionalism in every service we provide.
      </p>
    </div>
  </div>
);

const CleaningServicesSection = () => (
  <div className="w-full flex flex-col md:flex-row items-center justify-between bg-green-900 relative min-h-[500px] px-4 md:px-16 rounded-t-2xl mt-16">
    <div className="w-full md:w-1/2 max-w-xl mb-8 md:mb-0">
      <h2 className="text-2xl md:text-4xl font-bold leading-tight text-white">
        Your ideal choice in the world of cleaning
      </h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed text-white">
        <span className="text-green-300 font-semibold">logo</span> is not just
        a cleaning company, it is your partner in maintaining a healthy and beautiful environment.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 md:gap-10 mt-6 text-base md:text-lg text-white">
        <ul className="space-y-3">
          <li className="flex items-center gap-2">Extensive experience</li>
          <li className="flex items-center gap-2">Professional work team</li>
          <li className="flex items-center gap-2">Competitive prices</li>
        </ul>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">Quality assurance</li>
          <li className="flex items-center gap-2">Excellent customer service</li>
          <li className="flex items-center gap-2">Various services</li>
        </ul>
      </div>
    </div>
    <div className="relative w-full md:w-auto flex justify-center md:absolute md:bottom-0 md:right-0">
      <Image
        src="/images/allservices.png"
        alt="Cleaning Team"
        width={350}
        height={250}
        className="object-cover md:w-[650px] md:h-[450px] w-[220px] h-[150px]"
      />
    </div>
  </div>
);

export default function AllServices() {
  const { baseUrl } = useApi();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // حالة التحميل

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // ابدأ التحميل
      try {
        const res = await fetch(`${baseUrl}/api/categories`, {
          method: "GET",
          next: { 
            revalidate: 60,
            tags: ["categories"],
            cache: "force-cache",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();

        const mappedData = json.data.map((category) => ({
          categoryName: category.name,
          services: category.services.map((s) => ({
            id: s.id,
            name: s.name,
            img: s.pictureUrl,
          })),
        }));

        setData(mappedData);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false); // انتهى التحميل
      }
    }

    fetchData();
  }, [baseUrl]);

  return (
    <div>
      <Navbar />
      <CleaningServicesBanner />
      <section className="py-10 bg-white container mx-auto px-4">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-green-600 border-gray-200 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-700">Uploading data ...</h3>
            <p className="text-sm text-gray-400 mt-1">please wait a moment  </p>
          </div>
        ) : (
          data.map((group, index) => (
            <HomeCleaningSlider
              key={index}
              category={group.categoryName}
              services={group.services}
            />
          ))
        )}
      </section>
      <CleaningServicesSection />
      <Footer />
    </div>
  );
}
