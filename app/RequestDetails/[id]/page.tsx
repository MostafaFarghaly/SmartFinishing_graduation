"use client";
import { useParams } from "next/navigation";
import { useApi } from "../../context/ApiContext";
import { useToken } from "../../context/token_context";
import { useEffect, useState } from "react";
import Navbar from "../../components/Nav/page";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function RequestDetailsPage() {
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";

  const { baseUrl } = useApi();
  const { token, userData } = useToken();

  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const role =
    userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";
  const isCustomer = role.toLowerCase() === "customer";
  const isWorker = role.toLowerCase() === "worker";

  useEffect(() => {
    if (!id || !token || (!isCustomer && !isWorker)) {
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const endpoint = isCustomer
          ? `/api/Requests/customer-requests/${id}`
          : `/api/Requests/received-requests/${id}`;

        const url = `${baseUrl}${endpoint}`;
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
          next: { revalidate: 60 }, // Revalidate every 60 seconds
        });
        
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Failed to fetch request: ${res.status} - ${errText}`);
        }

        const data = await res.json();
        setRequest(data);
        console.log("Request details:", data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, token, baseUrl, isCustomer, isWorker]);

  const canPrev = startIndex > 0;
  const canNext =
    request?.projectImageUrls?.length > 0 &&
    startIndex + 1 < request.projectImageUrls.length;

  const goPrev = () => {
    if (canPrev) setStartIndex((prev) => prev - 1);
  };

  const goNext = () => {
    if (canNext) setStartIndex((prev) => prev + 1);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-green-600 border-gray-300 mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-700">Uploading Data ...</h3>
        <p className="text-sm text-gray-400 mt-1">Please wait a moment</p>
      </div>
    );

  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!request)
    return (
      <div className="flex flex-col justify-center items-center py-20 text-center">
        <div className="text-6xl text-gray-400 mb-4">
          <i className="fas fa-info-circle"></i>
        </div>
        <h3 className="text-xl font-semibold text-gray-600">No request details found</h3>
        <p className="text-gray-400 mt-2 max-w-md">
          The request you're looking for might have been removed or doesn't exist.
        </p>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

       


        {/* الصور */}
        {request.projectImageUrls?.length > 0 ? (
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{request.projectName}</h2>

            <div className="relative w-full max-w-md h-[200px] sm:h-[250px] md:h-[300px] mx-auto flex items-center justify-center">
              <button
                onClick={goPrev}
                disabled={!canPrev}
                className={`absolute left-[-30px] sm:left-[-40px] top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-green-500 text-white shadow hover:bg-green-600 transition ${
                  !canPrev ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                &#8592;
              </button>

              <img
                src={request.projectImageUrls[startIndex]}
                alt={`Image ${startIndex}`}
                className="rounded-xl shadow-md object-cover w-full h-full cursor-pointer"
                onClick={() => {
                  setCurrentIndex(startIndex);
                  setOpenLightbox(true);
                }}
              />

              <button
                onClick={goNext}
                disabled={!canNext}
                className={`absolute right-[-30px] sm:right-[-40px] top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-green-500 text-white shadow hover:bg-green-600 transition ${
                  !canNext ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                &#8594;
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center mb-6">
            <i className="fas fa-image text-gray-300 text-4xl mb-2"></i>
            <p className="text-gray-500">No images available</p>
          </div>
        )}

        {/* تفاصيل المشروع */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Project Details</h1>
          </div>

          <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
             {/* صورة الطرف الآخر */} 
            <div className="mb-8 text-center">
              {isWorker && request.customerProfilePicture && (
                <div className="inline-block text-center">
                  <img
                    src={request.customerProfilePicture}
                    alt="Customer Profile"
                    className="w-24 h-24 rounded-full object-cover mx-auto shadow"
                  />
                  <p className="mt-2 text-sm text-gray-600">Customer</p>
                </div>
              )}
              {isCustomer && request.workerProfilePicture && (
                <div className="inline-block text-center">
                  <img
                    src={request.workerProfilePicture}
                    alt="Worker Profile"
                    className="w-24 h-24 rounded-full object-cover mx-auto shadow"
                  />
                  <p className="mt-2 text-sm text-gray-600">Worker</p>
                </div>
              )}
            </div>
            <DetailItem label="Customer Name" value={request.customerName} icon="fas fa-user" />
            <DetailItem label="Worker Name" value={request.workerName} icon="fas fa-user-tie" />
            <DetailItem label="Service" value={request.serviceName} icon="fas fa-tools" />
            <DetailItem label="Apartment Type" value={request.apartmentType} icon="fas fa-building" />
            <DetailItem label="Apartment Size" value={`${request.apartmentSize || "N/A"} m²`} icon="fas fa-ruler-combined" />
            <DetailItem label="Material Quality" value={request.materialQuality} icon="fas fa-star" />
            <DetailItem
              label="Budget"
              value={
                request.minBudget && request.maxBudget
                  ? `${request.minBudget.toLocaleString()} - ${request.maxBudget.toLocaleString()} EGP`
                  : "N/A"
              }
              icon="fas fa-money-bill-wave"
            />
            <DetailItem
              label="Location"
              value={
                request.customerAddress && request.customerCity
                  ? `${request.customerAddress}, ${request.customerCity}`
                  : "N/A"
              }
              icon="fas fa-map-marker-alt"
            />
            <DetailItem label="Preferred Style" value={request.preferredStyle} icon="fas fa-paint-brush" />
            <DetailItem label="Project Details" value={request.projectDetails} icon="fas fa-align-left" fullWidth />
          </div>

          <div className="bg-gray-50 px-4 sm:px-6 py-4 border-t">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
              <span className="flex items-center gap-2 text-sm">
                <strong>Status:</strong>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    request.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : request.status === "Accepted"
                      ? "bg-green-100 text-green-800"
                      : request.status === "Completed"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {request.status}
                </span>
              </span>
              <span className="text-sm text-gray-500">
                <i className="far fa-calendar-alt mr-1"></i>
                {new Date(request.requestDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {openLightbox && (
        <Lightbox
          open={openLightbox}
          close={() => setOpenLightbox(false)}
          index={currentIndex}
          slides={request.projectImageUrls.map((url: string) => ({ src: url }))}
        />
      )}
    </>
  );
}

function DetailItem({
  label,
  value,
  icon,
  fullWidth = false,
}: {
  label: string;
  value: string | number;
  icon: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={`${fullWidth ? "col-span-1 sm:col-span-2" : ""}`}>
      <div className="flex items-start">
        <div className="bg-gray-100 p-3 rounded-lg mr-4 text-gray-600">
          <i className={`${icon} fa-lg`}></i>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
            {label}
          </h4>
          <p className="text-base sm:text-lg text-gray-800 break-words">{value || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
