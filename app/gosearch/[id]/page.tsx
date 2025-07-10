"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useApi } from "../../context/ApiContext";
import Navbar from "../../components/Nav/page";
import Footer from "../../components/Footer/page";
import { useToken } from "../../context/token_context";
import { useLoginClient } from "../../context/regester/login_context";

export default function GoSearch() {
  const { baseUrl } = useApi();
  const params = useParams();
  const router = useRouter();

  const serviceId = params.id;
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState<string | null>(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const { userData } = useToken();
  const { saveData } = useLoginClient();

  const userRole =
    userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";

  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch(`${baseUrl}/api/Cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      }
    }

    fetchCities();
  }, [baseUrl]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    async function fetchData() {
      try {
        const res = await fetch(`${baseUrl}/api/categories`);
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        const allServices = data?.data?.flatMap((cat) => cat.services || []);
        const foundService = allServices.find(
          (s) => String(s.id) === String(serviceId)
        );

        if (!foundService) {
          router.replace("/not-found");
          return;
        }

        setSelectedService(foundService);

        // Set last updated time
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastUpdated(timeStr);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (serviceId) {
      fetchData(); // initial fetch

      interval = setInterval(() => {
        fetchData();
      }, 15000); // update every 30 seconds
    }

    return () => clearInterval(interval);
  }, [baseUrl, serviceId, router]);

  const handleClick = (id: number, type: "request" | "profile") => {
    const key = `${id}-${type}`;
    setLoadingButton(key);
    const path = type === "request" ? `/send-request/${id}` : `/viewprofile/${id}`;
    setTimeout(() => {
      router.push(path);
      setLoadingButton(null);
    }, 500);
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center py-20 text-gray-600">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 border-solid mb-4"></div>
        <p className="text-lg font-medium">Loading data, please wait...</p>
      </div>
    );

  if (!selectedService) return null;

  const workers = selectedService.workers || [];

  const filteredWorkers = workers
    .filter((worker) =>
      selectedCity === "All" ? true : worker.city === selectedCity
    )
    .sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const heroImage = selectedService.pictureUrl || "/images/default-hero.jpg";

  return (
    <>
      <Navbar />
      <div className="px-4 max-w-7xl mx-auto">
        {/* Hero */}
        <div className="flex flex-col md:flex-row gap-6 items-center my-6">
          <div className="w-full md:w-1/2">
            <Image
              src={heroImage}
              alt={`Banner for ${selectedService.name}`}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-auto"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              🔹 Top {selectedService.name} workers near you
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              These workers are top-rated for skill, experience, and customer satisfaction.
            </p>
            <hr className="border-gray-300" />
          </div>
        </div>

        {/* City Filter */}
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by City:
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full md:w-1/3 border border-gray-300 rounded px-3 py-2"
          >
            <option value="All">All Cities</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          {/* Last Updated Indicator */}
          {/* <p className="text-gray-500 text-sm mt-2">
            🔄 Last updated at: <span className="font-medium">{lastUpdated}</span>
          </p> */}
        </div>

        {/* Workers List */}
        <div className="bg-white rounded-lg">
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker) => (
              <div
                key={worker.id}
                className="relative group flex flex-col md:flex-row items-center border pb-4 mb-4 border-gray-200 bg-white rounded-lg p-4 hover:shadow-md transition duration-300"
              >
                <div>
                  <Image
                    src={worker.profilePicture || "/images/default-user.png"}
                    alt={worker.name || "Worker profile"}
                    width={80}
                    height={80}
                    className="rounded-full object-cover w-20 h-20 bg-gray-200"
                  />
                </div>
                <div className="flex-1 px-4 text-center md:text-left mt-4 md:mt-0">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {worker.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{worker.email}</p>
                  <p className="text-gray-600 text-sm">{worker.city}</p>
                  <div className="flex justify-center md:justify-start items-center gap-1 text-yellow-500 text-sm mt-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>
                        {i < Math.round(worker.rating || 0) ? "★" : "☆"}
                      </span>
                    ))}
                    <span className="text-gray-600 ml-2">
                      {worker.rating?.toFixed(1) || "0.0"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 text-center mt-4 md:mt-0">
                  {userRole !== "Worker" && (
                    <button
                      onClick={() => handleClick(worker.id, "request")}
                      disabled={loadingButton === `${worker.id}-request`}
                      className="relative px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-white hover:text-green-600 border border-transparent hover:border-green-600 transition"
                    >
                      {loadingButton === `${worker.id}-request` ? (
                        <div className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            />
                          </svg>
                          Loading...
                        </div>
                      ) : (
                        "Send Request"
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => handleClick(worker.id, "profile")}
                    disabled={loadingButton === `${worker.id}-profile`}
                    className="relative px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-white hover:text-green-600 border border-transparent hover:border-green-600 transition"
                  >
                    {loadingButton === `${worker.id}-profile` ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Loading...
                      </div>
                    ) : (
                      "View Profile"
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-sm py-10">
              No workers available in this city at the moment.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
