"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApi } from "../../context/ApiContext";

export default function SendRequestPage() {
  const { id } = useParams(); // workerId
  const router = useRouter();
  const { baseUrl } = useApi();

  const [projectId, setProjectId] = useState<number>(0);
  const [projects, setProjects] = useState<any[]>([]);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Worker Info
  const [workerName, setWorkerName] = useState<string>("");
  const [workerImage, setWorkerImage] = useState<string>("");
  const [serviceName, setServiceName] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Get Projects
        const projectsRes = await fetch(`${baseUrl}/api/Projects`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (!projectsRes.ok) throw new Error("Failed to load projects");
        const projectsData = await projectsRes.json();
        setProjects(projectsData);

        // Get Worker Info
        const workerRes = await fetch(`${baseUrl}/api/Profile/workers/${id}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (workerRes.ok) {
          const workerData = await workerRes.json();
          setWorkerName(workerData.name || "Unknown");
          setWorkerImage(workerData.profilePictureUrl || "");
          setServiceName(workerData.serviceName || "");
          setRating(workerData.rating || 0);
        } else {
          setWorkerName("Unknown");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data");
      }
    };

    fetchData();
  }, [baseUrl, id]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseUrl}/api/Requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          workerId: Number(id),
          projectId,
        }),
      });

      if (!res.ok) throw new Error("Failed to send request");
      const data = await res.json();
      setResponse(data);

      setTimeout(() => {
        router.push("/requests");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
        >
          <i className="fas fa-arrow-left"></i>
          Back
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-blue-700">
          <i className="fas fa-paper-plane mr-2"></i>Send Request
        </h1>

        {/* Worker Info */}
        <div className="flex items-center gap-4">
          {workerImage && (
            <img
              src={workerImage}
              alt="Worker"
              className="w-16 h-16 rounded-full object-cover border border-gray-300"
            />
          )}
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-800">{workerName}</p>
            <p className="text-sm text-gray-500">{serviceName}</p>
            <div className="text-yellow-500 text-sm">
              {Array.from({ length: 5 }, (_, i) => (
                <i
                  key={i}
                  className={`fa-star ${i < rating ? "fas" : "far"} mr-1`}
                ></i>
              ))}
            </div>
          </div>
        </div>

        {/* Select Project */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Choose a Project
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={projectId}
            onChange={(e) => setProjectId(Number(e.target.value))}
            disabled={projects.length === 0}
          >
            <option value={0}>-- Select a project --</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name} - {project.apartmentType}
              </option>
            ))}
          </select>

          {projects.length === 0 && (
            <div className="mt-2 text-blue-600 flex items-center gap-2 text-sm">
              <i className="fas fa-info-circle"></i>
              <span>No projects found.</span>
              <a
                href="/startProject"
                className="text-blue-700 hover:underline font-semibold"
              >
                + Start one
              </a>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || projectId === 0}
          className={`w-full flex justify-center items-center gap-2 py-2 px-4 rounded-lg text-white text-sm font-semibold transition-all ${
            loading || projectId === 0
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 shadow-md"
          }`}
        >
          {loading ? (
            <>
              <i className="fa fa-spinner fa-spin"></i>
              Sending...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane"></i>
              Send Request
            </>
          )}
        </button>

        {/* Error Alert */}
        {error && (
          <div className="p-3 mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Success Alert */}
        {response && (
          <div className="p-3 mt-2 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md text-sm">
            <strong>Success!</strong> Request sent successfully.
          </div>
        )}
      </div>
    </div>
  );
}
