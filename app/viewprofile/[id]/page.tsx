"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useToken } from "../../context/token_context";
import { useLoginClient } from "../../context/regester/login_context";
import { useApi } from "../../context/ApiContext";
import Navbar from "../../components/Nav/page";
import Footer from "../../components/Footer/page";

type Review = {
  customerName: string;
  comment: string;
  rating: number;
};

type Worker = {
  id: number;
  name: string;
  description: string;
  companyName: string;
  experienceYears: number;
  profilePictureUrl: string;
  city: string;
  phoneNumber: string;
  serviceName: string;
  rating: number | null;
  reviews: Review[];
  portfolioItems: {
    imageUrls: string[];
  }[];
};

export default function ViewProfile() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { baseUrl } = useApi();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [viewAllLoading, setViewAllLoading] = useState(false);


  const { userData } = useToken();
  const { saveData } = useLoginClient();

  const userRole =
    userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
    "";

  const isOwnProfile = userRole === "Worker" && id === String(saveData?.workerId);
  const isOwnerByEmail = saveData?.email === userData?.email && userRole === "Worker";


  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/Profile/workers/${id}`);
        if (!res.ok) throw new Error("Worker not found");
        const data = await res.json();
        setWorker(data);
      } catch (err) {
        console.error("Error fetching worker:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchWorker();
  }, [id, baseUrl]);

  // Function to convert rating number to stars with half star and number beside
  const renderStars = (rating: number | null) => {
    if (!rating || rating < 1)
      return <span className="text-gray-400">No rating</span>;

    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <span className="flex items-center gap-1 text-yellow-500 font-semibold">
        {/* نجوم كاملة */}
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <span key={"full-" + i}>★</span>
          ))}
        {/* نصف نجمة */}
        {hasHalfStar && (
          <span
            key="half"
            className="relative inline-block w-4 h-4 text-yellow-500"
            aria-label="Half Star"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="halfGradient">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="lightgray" />
                </linearGradient>
              </defs>
              <path
                fill="url(#halfGradient)"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          </span>
        )}
        {/* نجوم فارغة */}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <span key={"empty-" + i} className="text-gray-300">
              ★
            </span>
          ))}
        {/* الرقم بجانب النجوم */}
        <span className="text-gray-700 ml-1 text-sm font-normal">
          ({rating.toFixed(1)})
        </span>
      </span>
    );
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-green-600 border-gray-300 mb-4"></div>
      <h3 className="text-lg font-semibold text-gray-700"> Loading profile details ...</h3>
      <p className="text-sm text-gray-400 mt-1"> Please wait a moment.</p>
      </div>
    );

  if (!worker)
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Worker not found.
      </div>
    );

  return (<>
    <Navbar  />
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-md shadow-md">
      {/* Header */}
      <div className="flex items-center border-b border-gray-200 pb-6 mb-6">
        <div className="w-24 h-24 relative flex-shrink-0 rounded-full overflow-hidden border border-gray-300">
          <Image
            src={worker.profilePictureUrl || "/images/default-user.png"}
            alt="Profile"
            fill
            sizes="96px"
            className="object-cover rounded-full"
          />
        </div>
        <div className="ml-6">
          <h1 className="text-3xl font-semibold text-gray-900">{worker.name}</h1>
          <p className="text-gray-500 text-lg mt-1">{worker.companyName}</p>
          <div className="mt-2 text-sm font-semibold flex items-center gap-2">
            {renderStars(worker.rating)}
            {/* العدد ظاهر مع النجوم بالفعل */}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Column */}
        <div className="flex-1">
          {/* About Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">About</h2>
            <p className="text-gray-700 leading-relaxed">{worker.description}</p>
            {/* Request a Quote Button */}
            {/* Request Button */}
            {userRole === "Worker" && isOwnProfile && (
              <button
                className="mt-6 bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 px-8 rounded-lg shadow-md flex items-center justify-center"
                onClick={async () => {
                  setQuoteLoading(true);
                  await router.push("/requests");
                }}
                type="button"
                disabled={quoteLoading}
              >
                {quoteLoading ? <i className="fa fa-spinner fa-spin"></i> : "Requests"}
              </button>
            )}

            {userRole === "Customer" && (
              <button
                className="mt-6 bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 px-8 rounded-lg shadow-md flex items-center justify-center"
                onClick={async () => {
                  setQuoteLoading(true);
                  await router.push(`/send-request/${worker.id}`);
                }}
                type="button"
                disabled={quoteLoading}
              >
                {quoteLoading ? <i className="fa fa-spinner fa-spin"></i> : "Send Request"}
              </button>
            )}

          </section>

          {/* Highlights */}
          <section className="grid grid-cols-2 gap-6 border-t border-gray-200 pt-6 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-600">Service</h3>
              <p className="text-gray-700 text-base">{worker.serviceName}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600">Experience</h3>
              <p className="text-gray-700 text-base">{worker.experienceYears} years</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600">Phone</h3>
              <p className="text-gray-700 text-base">{worker.phoneNumber}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600">City</h3>
              <p className="text-gray-700 text-base">{worker.city}</p>
            </div>
          </section>

          {/* Reviews */}
          <section className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Reviews</h2>
            {worker.reviews.length === 0 ? (
              <p className="text-gray-500 italic">No reviews yet.</p>
              ) : (
              worker.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="mb-5 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100"
                >
                  <p className="font-semibold text-gray-800">{review.customerName}</p>
                  <div>{renderStars(review.rating)}</div>
                  <p className="text-gray-700 italic mt-1">"{review.comment}"</p>
                </div>
              ))
            )}
          </section>
        </div>

        {/* Portfolio */}
        <aside className="w-full lg:w-80">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Portfolios</h2>

            {isOwnProfile && (
              <button
                onClick={async () => {
                  setPortfolioLoading(true);
                  await router.push("/AddPortfolio");
                  // setPortfolioLoading(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow flex items-center justify-center"
                type="button"
                disabled={portfolioLoading}
              >
                {portfolioLoading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "+ Add Portfolio"
                )}
              </button>
            )}

          </div>

          <div className="grid grid-cols-2 gap-3">
            {worker.portfolioItems
              .flatMap((item) => item.imageUrls)
              .slice(0, 6)
              .map((url, index) => (
                <div
                  key={`${url}-${index}`}
                  className="relative w-full h-24 rounded-lg overflow-hidden border border-gray-200"
                >
                  <Image
                    src={url}
                    alt="Portfolio Image"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              ))}
          </div>

          {worker.portfolioItems.flatMap((item) => item.imageUrls).length > 0 && (
            <button
              onClick={async () => {
                setViewAllLoading(true);
                await router.push(`/viewprofile/${id}/portfolio`);
                // setViewAllLoading(false);
              }}
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md font-medium transition flex items-center justify-center"
              type="button"
              disabled={viewAllLoading}
            >
              {viewAllLoading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "View All Portfolios"
              )}
            </button>
          )}

        </aside>
      </div>
    </div>
    <Footer />
  </>);
}
