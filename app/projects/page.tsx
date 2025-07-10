"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useApi } from "../context/ApiContext";
import { useToken } from "../context/token_context";
import { useLoginClient } from "../context/regester/login_context";
import { CalendarDays, MapPin, Trash2 } from "lucide-react";
import Navbar from "../components/Nav/page";

type ProjectImage = {
  id: number;
  imageUrl: string;
};

type Project = {
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
};

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { baseUrl } = useApi();
  const { userData } = useToken();
  const { saveData } = useLoginClient();

  const userRole =
    userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";
  const userEmail =
    userData?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || "";

  const isOwnProfile =
    userRole.toLowerCase() === "customer" &&
    userEmail.toLowerCase() === saveData?.email?.toLowerCase();

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${baseUrl}/api/Projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [baseUrl]);

  const handleDelete = async (projectId: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${baseUrl}/api/Projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete project");

      // احذف المشروع من القائمة بدون إعادة تحميل الصفحة
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch (err: any) {
      alert("Error deleting project: " + err.message);
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

  if (error)
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load projects: {error}
      </p>
    );

  return (<>
    <Navbar />
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Projects</h1>

      {isOwnProfile && (
        <div className="mb-6">
          <Link href="/startProject">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Add New Project
            </button>
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="text-center mt-10 text-gray-600">
            No projects found.
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border rounded-xl p-4 shadow hover:shadow-md transition relative"
            >
              <Link href={`/projects/${project.id}`} >
                <h2 className="text-lg font-semibold">{project.name}</h2>
                <p className="text-gray-600">{project.serviceName}</p>

                <div className="flex items-center text-sm text-gray-500 mt-2 gap-4">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    Request made{" "}
                    {new Date(project.createdDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>

                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {saveData?.cityName}, {saveData?.address}
                  </span>
                </div>
              </Link>


              {/* زر الحذف */}
              {isOwnProfile && (
                <button
                  onClick={() => handleDelete(project.id)}
                  title="Delete Project"
                  className="absolute top-4 right-4 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  </>);
}
