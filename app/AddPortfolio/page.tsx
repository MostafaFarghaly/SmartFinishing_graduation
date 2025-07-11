"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginClient } from "../context/regester/login_context";
import { useApi } from "../context/ApiContext";

export default function AddPortfolioPage() {
  const router = useRouter();
  const { saveData } = useLoginClient();
  const { baseUrl } = useApi();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpload = async () => {
    if (!images || !name.trim() || !description.trim()) {
      setError("Please fill in all fields and select at least one image.");
      setSuccessMessage("");
      return;
    }

    setUploading(true);
    setError("");
    setSuccessMessage("");

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("ImageFiles", images[i]);
    }

    try {
      const url = `${baseUrl}/api/Portfolio?Name=${encodeURIComponent(name)}&Description=${encodeURIComponent(description)}`;

      const res = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${saveData?.token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to upload portfolio.");

      setSuccessMessage("✅ Portfolio uploaded successfully!");
      setTimeout(() => {
        router.push(`/viewprofile/${saveData?.workerId}`);
      }, 1500);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong while uploading.");
      }
    } finally {
      setUploading(false);
    }
  };

  if (uploading) {
    return (
      <div className="flex flex-col justify-center items-center py-20 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-green-600 border-gray-300 mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-700">Uploading portfolio...</h3>
        <p className="text-sm text-gray-500 mt-1">Please wait</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-700">
          Upload New Portfolio
        </h1>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
        {successMessage && <p className="text-green-600 text-sm mb-4 text-center">{successMessage}</p>}

        <div className="mb-5">
          <label className="block mb-1 text-sm font-semibold text-gray-700">Portfolio Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="e.g., Plumbing Projects"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-1 text-sm font-semibold text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg resize-none h-28 focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="Briefly describe the portfolio"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-1 text-sm font-semibold text-gray-700">Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>

        {images && (
          <div className="grid grid-cols-3 gap-3 mb-5">
            {Array.from(images).map((img) => (
              <img
                key={img.name}
                src={URL.createObjectURL(img)}
                alt={img.name}
                className="h-24 w-full object-cover rounded-lg border"
              />
            ))}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          {uploading ? (
            <span className="flex justify-center items-center gap-2">
              <i className="fa fa-spinner fa-spin"></i> Uploading...
            </span>
          ) : (
            "Upload Portfolio"
          )}
        </button>
      </div>
    </div>
  );
}
