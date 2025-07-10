"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApi } from "../../../context/ApiContext";

const spaceTypes = ["Apartment", "Villa", "Studio", "Office", "Duplex"];
const finishStyles = ["Modern", "Classic", "Minimalist", "Industrial", "Bohemian"];
const qualityLevels = ["High Quality", "Medium Quality", "Economy Quality"];

type Service = { id: number; name: string };

export default function EditProjectPage() {
  const { baseUrl } = useApi();
  const { id } = useParams();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [services, setServices] = useState<Service[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    serviceId: "",
    apartmentType: "",
    apartmentSize: "",
    preferredStyle: "",
    materialQuality: "",
    minBudget: "",
    maxBudget: "",
    details: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // تحميل بيانات المشروع
        const res = await fetch(`${baseUrl}/api/Projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const text = await res.text();
        if (!text) throw new Error("Empty response from project API");
        const data = JSON.parse(text);

        setFormData({
          name: data.name ?? "",
          serviceId: data.serviceId?.toString() ?? "",
          apartmentType: data.apartmentType ?? "",
          apartmentSize: data.apartmentSize ?? "",
          preferredStyle: data.preferredStyle ?? "",
          materialQuality: data.materialQuality ?? "",
          minBudget: data.minBudget?.toString() ?? "",
          maxBudget: data.maxBudget?.toString() ?? "",
          details: data.details ?? "",
        });

        // تحميل الخدمات
        const catRes = await fetch(`${baseUrl}/api/Categories`);
        const catJson = await catRes.json();
        const extractedServices = (catJson?.data || []).flatMap((category: any) =>
          (category.services || []).map((s: any) => ({
            id: s.id,
            name: s.name,
          }))
        );
        setServices(extractedServices);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${baseUrl}/api/Projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          serviceId: parseInt(formData.serviceId),
          minBudget: parseInt(formData.minBudget),
          maxBudget: parseInt(formData.maxBudget),
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to update project");
      }

      alert("Project updated successfully!");
      router.push(`/projects/${id}`);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-green-600 border-gray-300 mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-700">Loading Data...</h3>
        <p className="text-sm text-gray-400 mt-1">Please wait, this may take a moment.</p>
      </div>
    );
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold mb-4">Edit Project</h1>

      {/* الخطوة الأولى */}
      {step === 1 && (
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Project Name"
            className="w-full border px-4 py-2 rounded"
          />
          <select
            name="serviceId"
            value={formData.serviceId || ""}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select Service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <select
            name="apartmentType"
            value={formData.apartmentType || ""}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select Apartment Type</option>
            {spaceTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="apartmentSize"
            value={formData.apartmentSize}
            onChange={handleChange}
            placeholder="Apartment Size"
            className="w-full border px-4 py-2 rounded"
          />
          <button
            onClick={() => setStep(2)}
            disabled={submitting}
            className={`flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded w-full ${
              submitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : (
              "Next"
            )}
          </button>
        </div>
      )}

      {/* الخطوة الثانية */}
      {step === 2 && (
        <div className="space-y-4">
          <select
            name="preferredStyle"
            value={formData.preferredStyle || ""}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select Style</option>
            {finishStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>

          <select
            name="materialQuality"
            value={formData.materialQuality || ""}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select Material Quality</option>
            {qualityLevels.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="minBudget"
            value={formData.minBudget}
            onChange={handleChange}
            placeholder="Min Budget"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="number"
            name="maxBudget"
            value={formData.maxBudget}
            onChange={handleChange}
            placeholder="Max Budget"
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Details"
            className="w-full border px-4 py-2 rounded"
          />
          <div className="flex justify-between gap-2">
            <button
              onClick={() => setStep(1)}
              disabled={submitting}
              className={`bg-gray-500 text-white px-4 py-2 rounded flex-1 ${
                submitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded flex-1 ${
                submitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}