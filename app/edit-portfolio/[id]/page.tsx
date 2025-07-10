"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLoginClient } from "../../context/regester/login_context";
import { useApi } from "../../context/ApiContext";

export default function EditPortfolioPage() {
  const { token, saveData } = useLoginClient();
  const { baseUrl } = useApi();
  const params = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const id = params.id;

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/Portfolio/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch portfolio data");

        const data = await res.json();
        setFormData({ name: data.name, description: data.description });
      } catch (err: any) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    if (token && id) fetchPortfolio();
  }, [token, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await fetch(`${baseUrl}/api/Portfolio/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update portfolio");

      setSuccessMessage("✅ Portfolio updated successfully!");
      setTimeout(() => {
        router.push(`/viewprofile/${saveData.workerId}/portfolio`);
      }, 1200);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-20 text-gray-600">
        <div className="flex items-center gap-3 text-lg">
          <svg className="animate-spin h-6 w-6 text-green-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading portfolio...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">Edit Portfolio</h1>

        {error && <p className="text-red-600 text-center mb-4 text-sm">{error}</p>}
        {successMessage && <p className="text-green-600 text-center mb-4 text-sm">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Portfolio Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Kitchen Renovation"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Add a short description..."
              required
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <i className="fa fa-spinner fa-spin"></i> Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
