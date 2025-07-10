"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApi } from "../../context/ApiContext";
import { useToken } from "../../context/token_context";
import { useLoginClient } from "../../context/regester/login_context";
import Image from "next/image";
import { Pencil, Home, Ruler, Paintbrush, Package, Info, DollarSign, Calendar, MapPin } from "lucide-react";
import Navbar from "../../components/Nav/page";

interface ProjectImage {
  id: number;
  imageUrl: string;
}

interface Project {
  id: number;
  name: string;
  serviceId: number;
  serviceName: string;
  apartmentType: string;
  apartmentSize: string;
  preferredStyle: string;
  materialQuality: string;
  minBudget: number;
  maxBudget: number;
  details: string;
  createdDate: string;
  projectImages: ProjectImage[];
}

export default function ProjectDetailsPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { baseUrl } = useApi();
  const { userData } = useToken();
  const { saveData } = useLoginClient();
  const { id } = useParams();
  const router = useRouter();

  const userRole =
    userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";
  const isOwner = userRole.toLowerCase() === "customer";

  const [uploading, setUploading] = useState(false);

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${baseUrl}/api/Projects/${id}/images/${imageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = await fetch(`${baseUrl}/api/Projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await updated.json();
      setProject(data);
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete image: " + err });
    }
  };

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseUrl}/api/Projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProject(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [baseUrl, id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${baseUrl}/api/Projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ type: "success", text: "Project deleted successfully" });
      setTimeout(() => router.push("/projects"), 1200);
    } catch (err: any) {
      setMessage({ type: "error", text: "Error deleting project: " + err.message });
    }
  };

  const handleUploadImages = async () => {
    if (!selectedFiles) {
      setMessage({ type: "error", text: "Please select image(s) first." });
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseUrl}/api/Projects/${id}/images`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const updatedProject = await res.json();
      setProject(updatedProject);
      setSelectedFiles(null);
      setMessage({ type: "success", text: "Images uploaded successfully!" });
    } catch (err: any) {
      setMessage({ type: "error", text: "Error uploading images: " + err.message });
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-green-600 border-gray-300 mb-4"></div>
      <h3 className="text-lg font-semibold text-gray-700">Loading Data...</h3>
      <p className="text-sm text-gray-400 mt-1">Please wait, this may take a moment.</p>
    </div>
  );
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!project) return <p className="text-center mt-10">Project not found.</p>;

  return (
    <>
      <Navbar />
      <div className="bg-[#f2f2f2] py-10 min-h-screen">
        <div className="bg-white rounded-xl shadow max-w-6xl mx-auto p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b pb-6 mb-6">
            <div className="flex gap-4 items-center">
              <img
                src={saveData?.profilePictureUrl || "/images/default-user.png"}
                alt="User"
                className="w-20 h-20 rounded-full object-cover border-2 border-green-600"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{saveData?.displayName || "---"}</h2>
                <p className="text-sm text-gray-500 flex items-center gap-1"><Calendar size={14} /> project created on {new Date(project.createdDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={14} /> {saveData?.address || "---"}</p>
              </div>
            </div>
            {isOwner && (
              <div className="flex gap-3">
                <button onClick={() => router.push(`/projects/${project.id}/edit`)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded shadow">
                  <Pencil size={18} />
                </button>
                <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded shadow">Delete</button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-10">
              <div className="flex items-center gap-2"><Home size={16} /><strong>Apartment type:</strong> {project.apartmentType || "---"}</div>
              <div className="flex items-center gap-2"><Ruler size={16} /><strong>Apartment size:</strong> {project.apartmentSize || "---"}</div>
              <div className="flex items-center gap-2"><Paintbrush size={16} /><strong>Preferred style:</strong> {project.preferredStyle || "---"}</div>
              <div className="flex items-center gap-2"><Package size={16} /><strong>Material quality:</strong> {project.materialQuality || "---"}</div>
              <div className="flex items-center gap-2"><DollarSign size={16} /><strong>Budget Range:</strong> {project.minBudget != null && project.maxBudget != null ? `${project.minBudget} EGP - ${project.maxBudget} EGP` : "---"}</div>
              <div className="flex items-center gap-2"><Info size={16} /><strong>Details:</strong> {project.details || "---"}</div>
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-2">Photos and videos</p>
              <div className="grid grid-cols-2 gap-4">
                {project.projectImages.map((img) => (
                  <div key={img.id} className="relative group rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                    <Image src={img.imageUrl} alt="Project Image" width={300} height={200} className="object-cover w-full h-40" />
                    {isOwner && (
                      <button onClick={() => handleDeleteImage(img.id)} className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                        Delete
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isOwner && (
                <div className="mt-6 space-y-2 bg-gray-50 rounded-xl p-4 shadow">
                  <input type="file" multiple accept="image/*" onChange={(e) => setSelectedFiles(e.target.files)} className="block w-full text-sm text-gray-600" />
                  <button
                    onClick={handleUploadImages}
                    disabled={uploading || !selectedFiles?.length}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded transition font-semibold
                      ${uploading || !selectedFiles?.length
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"}
                    `}
                  >
                    {uploading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                        Uploading...
                      </>
                    ) : selectedFiles?.length ? (
                      "Upload Images"
                    ) : (
                      "No files selected"
                    )}
                  </button>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
