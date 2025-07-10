"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLoginClient } from "../../context/regester/login_context";
import { useApi } from "../../context/ApiContext";

export default function AddPortfolioImages() {
  const { token, saveData } = useLoginClient();
  const { baseUrl } = useApi();
  const { id } = useParams();
  const router = useRouter();

  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!files || files.length === 0) {
      setErrorMessage("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("ImageFiles", file);
    });

    try {
      setLoading(true);

      const res = await fetch(`${baseUrl}/api/Portfolio/${id}/images`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload images");

      setSuccessMessage("✅ Images uploaded successfully");

      setTimeout(() => {
        if (saveData?.workerId) {
          router.push(`/viewprofile/${saveData.workerId}/portfolio`);
        } else {
          router.push("/");
        }
      }, 1500);
    } catch (err) {
      console.error("❌ Error uploading image:", err);
      setErrorMessage("Something went wrong while uploading.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-600 border-gray-300 mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-700">Uploading images...</h3>
        <p className="text-sm text-gray-400 mt-1">Please wait</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-green-700 text-center mb-6">
          Add Portfolio Images
        </h1>

        {successMessage && (
          <div className="bg-green-100 text-green-700 border border-green-300 rounded px-4 py-2 text-sm mb-4 text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded px-4 py-2 text-sm mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {files && (
            <div className="grid grid-cols-3 gap-3">
              {Array.from(files).map((file) => (
                <img
                  key={file.name}
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-24 w-full object-cover rounded"
                />
              ))}
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm px-4 py-2 rounded transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white text-sm px-5 py-2 rounded transition"
            >
              Upload Images
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
