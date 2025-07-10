"use client";
import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import { useToken } from "../context/token_context";
import { useLoginClient } from "../context/regester/login_context";
import Navbar from "../components/Nav/page";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";

type Request = {
    id: number;
    workerName: string;
    customerName: string;
    serviceName: string;
    projectName: string;
    status: string;
    requestDate?: string;
    customerAddress?: string;
    customerCity?: string;
    workerOfferedPrice?: number;
    finalAgreedPrice?: number;
    minBudget?: number;
    maxBudget?: number;
    workerId?: number; // تأكد من وجود هذا الحقل
};

const STATUS_LABELS: Record<string, string> = {
    Pending: "pending",
    Accepted: "accepted",
    Completed: "completed",
    Cancelled: "cancelled",
    Rejected: "rejected",
    Approve: "approved",
};

const STATUS_COLORS: Record<string, string> = {
    Pending: "text-yellow-500",
    Accepted: "text-green-600",
    Completed: "text-gray-500",
    Cancelled: "text-red-600",
    Rejected: "text-red-700",
    Approve: "text-green-600",
};

const TABS = [
    { label: "All", value: "all" },
    { label: "Pending", value: "Pending" },
    { label: "Accepted", value: "Accepted" },
    { label: "Completed", value: "Completed" },
    { label: "Cancelled", value: "Cancelled" },
    { label: "Rejected", value: "Rejected" },
];

export default function RequestsPage() {
    const { baseUrl } = useApi();
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tab, setTab] = useState("all");
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
    const [offeredPrice, setOfferedPrice] = useState<string>("");
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewRequestId, setReviewRequestId] = useState<number | null>(null);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState<number | null>(null);
    const [priceModalLoading, setPriceModalLoading] = useState(false);
    const [reviewModalLoading, setReviewModalLoading] = useState(false);
    const router = useRouter();

    const { userData } = useToken();
    const { saveData } = useLoginClient();

    const role = userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";
    const isCustomer = role.toLowerCase() === "customer";
    const isWorker = role.toLowerCase() === "worker";

    useEffect(() => {
            const fetchRequests = async () => {
                try {
                    const token = localStorage.getItem("token");
                    if (!token || (!isCustomer && !isWorker)) return;

                    const url = isCustomer
                        ? `${baseUrl}/api/Requests/customer-requests`
                        : `${baseUrl}/api/Requests/received-requests`;

                    const res = await fetch(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!res.ok) {
                        const errorText = await res.text();
                        throw new Error(`Failed to fetch requests: ${res.status} - ${errorText}`);
                    }

                    const data = await res.json();
                    setRequests(data);
                } catch (err: any) {
                    setError(err.message || "An error occurred");
                } finally {
                    setLoading(false);
                }
            };

        // جلب البيانات أول مرة
        fetchRequests();

        // إعداد التحديث التلقائي كل 30 ثانية
        const intervalId = setInterval(fetchRequests, 15000);

        // تنظيف الـ interval عند إلغاء التثبيت
        return () => clearInterval(intervalId);
    }, [baseUrl, isCustomer, isWorker]);
    const cancelRequest = async (requestId: number) => {
        setActionLoading(requestId);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${baseUrl}/api/Requests/customer-cancel/${requestId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error("Failed to cancel the request");

            const updated = await res.json();
            setRequests((prev) =>
                prev.map((req) => (req.id === requestId ? { ...req, status: updated.status } : req))
            );
            setMessage("✅ Request cancelled successfully");
        } catch (err: any) {
            setMessage("❌ " + err.message);
        } finally {
            setActionLoading(null);
        }
    };

    const acceptRequest = async () => {
        if (!selectedRequest?.id || !offeredPrice) return;
        setPriceModalLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `${baseUrl}/api/Requests/worker-accept/${selectedRequest.id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(Number(offeredPrice)),
                }
            );
            if (!res.ok) throw new Error("Failed to accept the request");
            const updated = await res.json();
            setRequests((prev) =>
                prev.map((req) =>
                    req.id === selectedRequest.id
                        ? { ...req, status: updated.status, workerOfferedPrice: Number(offeredPrice) }
                        : req
                )
            );
            setMessage("✅ Request accepted");
            setSelectedRequest(null);
            setOfferedPrice("");
        } catch (err: any) {
            setMessage("❌ " + err.message);
        } finally {
            setPriceModalLoading(false);
        }
    };

    const rejectRequest = async (requestId: number) => {
        setActionLoading(requestId);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${baseUrl}/api/Requests/worker-reject/${requestId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to reject the request");

            const updated = await res.json();
            setRequests((prev) =>
                prev.map((req) => (req.id === requestId ? { ...req, status: updated.status } : req))
            );
            setMessage("❌ Request rejected");
        } catch (err: any) {
            setMessage("❌ " + err.message);
        } finally {
            setActionLoading(null);
        }
    };

    const approveRequest = async (requestId: number) => {
        setActionLoading(requestId);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${baseUrl}/api/Requests/customer-approve/${requestId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(true),
            });

            if (!res.ok) throw new Error("Failed to approve the price");

            const updated = await res.json();
            setRequests((prev) =>
                prev.map((req) =>
                    req.id === requestId
                        ? { ...req, status: updated.status, finalAgreedPrice: updated.finalAgreedPrice }
                        : req
                )
            );
            setMessage("✅ Price approved successfully");
        } catch (err: any) {
            setMessage("❌ " + err.message);
        } finally {
            setActionLoading(null);
        }
    };

    const declinePrice = async (requestId: number) => {
        setActionLoading(requestId);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${baseUrl}/api/Requests/customer-approve/${requestId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(false),
            });

            if (!res.ok) throw new Error("Failed to reject the price");

            const updated = await res.json();
            setRequests((prev) =>
                prev.map((req) => (req.id === requestId ? { ...req, status: updated.status } : req))
            );
            setMessage("❌ Price rejected");
        } catch (err: any) {
            setMessage("❌ " + err.message);
        } finally {
            setActionLoading(null);
        }
    };

    const markAsCompleted = async (requestId: number) => {
        setActionLoading(requestId);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${baseUrl}/api/Requests/mark-completed/${requestId}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Error ${res.status}: ${text}`);
            }

            const updated = await res.json();
            setRequests(prev =>
                prev.map(r => (r.id === requestId ? { ...r, status: updated.status } : r))
            );
            
            // عند اكتمال الطلب، نفتح نموذج التقييم تلقائياً
            if (updated.status === "Completed") {
                setReviewRequestId(requestId);
                setShowReviewForm(true);
            }
            
            setMessage("✅ Request marked as completed");
        } catch (err: any) {
            setMessage("❌ " + err.message);
        } finally {
            setActionLoading(null);
        }
    };

    const submitReview = async () => {
        if (!reviewRequestId || !comment || rating < 1 || rating > 5) {
            setMessage("Please fill in all fields correctly");
            return;
        }
        setReviewModalLoading(true);
        try {
            const token = localStorage.getItem("token");
            const request = requests.find((r) => r.id === reviewRequestId);
            if (!request?.workerId) throw new Error("No valid workerId found");

            const res = await fetch(`${baseUrl}/api/Reviews`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    workerId: request.workerId,
                    comment,
                    rating,
                }),
            });

            if (!res.ok) throw new Error("Failed to submit the review");

            setMessage("✅ Review submitted successfully");
            setShowReviewForm(false);
            setReviewRequestId(null);
            setComment("");
            setRating(5);
        } catch (err: any) {
            setMessage("❌ " + err.message);
        } finally {
            setReviewModalLoading(false);
        }
    };

    const filteredRequests = tab === "all" ? requests : requests.filter((req) => req.status === tab);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-green-600 border-gray-300 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-700">Loading data...</h3>
            <p className="text-sm text-gray-400 mt-1">Please wait a moment</p>
        </div>
    );

    if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

    return (
        <>
            <Navbar />
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Requests</h1>
                {message && (
                    <div className="mb-4 p-3 rounded bg-blue-100 text-blue-800 border border-blue-300">
                        {message}
                    </div>
                )}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {TABS.map((t) => (
                        <button
                            key={t.value}
                            onClick={() => setTab(t.value)}
                            className={`px-4 py-1 rounded-full border transition ${
                                tab === t.value
                                    ? "bg-green-600 text-white font-bold"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {filteredRequests.length === 0 ? (
                    <p className="text-gray-500">No requests found.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {filteredRequests.map((req) => (
                            <div
                                key={req.id}
                                onClick={() => router.push(`/RequestDetails/${req.id}`)}
                                className="bg-white border rounded-xl p-5 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition"
                            >
                                <div className="flex-1">
                                    <div className="font-bold text-lg mb-1">Project: {req.projectName}</div>
                                    <div className="text-gray-700">{req.serviceName}</div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        Date: {req.requestDate ? new Date(req.requestDate).toLocaleDateString() : "N/A"}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        Address: {req.customerAddress || ""}, {req.customerCity || ""}
                                    </div>

                                    {typeof req.minBudget === "number" && typeof req.maxBudget === "number" && (
                                        <div className="text-sm text-gray-600 mt-1">
                                            Budget Range: {req.minBudget.toLocaleString()} - {req.maxBudget.toLocaleString()} EGP
                                        </div>
                                    )}

                                    {req.status === "Approve" &&
                                        typeof req.workerOfferedPrice === "number" && isCustomer && (
                                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4 shadow-sm">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="bg-green-100 text-green-700 p-2 rounded-full">
                                                        <i className="fas fa-dollar-sign"></i>
                                                    </div>
                                                    <h3 className="text-green-700 font-bold text-lg">Final Offer</h3>
                                                </div>

                                                <p className="text-3xl font-extrabold text-green-800 mb-1">
                                                    {req.workerOfferedPrice.toLocaleString()} EGP
                                                </p>

                                                <p className="text-sm text-gray-600 mb-4">
                                                    Worker has provided their final pricing
                                                </p>

                                                <div className="flex justify-between">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            approveRequest(req.id);
                                                        }}
                                                        className="text-green-600 font-semibold hover:underline flex items-center gap-1"
                                                        disabled={actionLoading === req.id}
                                                    >
                                                        {actionLoading === req.id ? (
                                                            <>
                                                                <i className="fas fa-spinner fa-spin"></i> Processing...
                                                            </>
                                                        ) : (
                                                            "Accept Offer"
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            declinePrice(req.id);
                                                        }}
                                                        className="text-red-600 font-semibold hover:underline flex items-center gap-1"
                                                        disabled={actionLoading === req.id}
                                                    >
                                                        {actionLoading === req.id ? (
                                                            <>
                                                                <i className="fas fa-spinner fa-spin"></i> Processing...
                                                            </>
                                                        ) : (
                                                            "Reject Offer"
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                    {typeof req.finalAgreedPrice === "number" && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4 shadow-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                                                    <i className="fas fa-check-circle"></i>
                                                </div>
                                                <h3 className="text-blue-700 font-bold text-lg">Final Price</h3>
                                            </div>

                                            <p className="text-2xl font-bold text-blue-800">
                                                {req.finalAgreedPrice.toLocaleString()} EGP
                                            </p>

                                            <p className="text-sm text-gray-600 mt-1">Agreed between customer and worker</p>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {!['Completed', 'Cancelled', 'Rejected'].includes(req.status) && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.push(`/chat/${req.id}`);
                                                }}
                                                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition duration-200 flex items-center gap-1"
                                            >
                                                {actionLoading === req.id ? (
                                                    <>
                                                        <i className="fas fa-spinner fa-spin"></i> Loading Chat...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-comments"></i> Go to Chat    
                                                    </>
                                                )}
                                            </button>
                                        )}

                                        {isCustomer && (
                                            <>
                                                {req.status === "Pending" && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            cancelRequest(req.id);
                                                        }}
                                                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition duration-200 flex items-center gap-1"
                                                        disabled={actionLoading === req.id}
                                                    >
                                                        {actionLoading === req.id ? (
                                                            <>
                                                                <i className="fas fa-spinner fa-spin"></i> Cancelling...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <i className="fas fa-times"></i> Cancel Request
                                                            </>
                                                        )}
                                                    </button>
                                                )}

                                                {req.status === "Accepted" && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            markAsCompleted(req.id);
                                                        }}
                                                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition duration-200 flex items-center gap-1"
                                                        disabled={actionLoading === req.id}
                                                    >
                                                        {actionLoading === req.id ? (
                                                            <>
                                                                <i className="fas fa-spinner fa-spin"></i> Completing...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <i className="fas fa-check"></i> Mark as Completed
                                                            </>
                                                        )}
                                                    </button>
                                                )}
                                            </>
                                        )}

                                        {isWorker && req.status === "Pending" && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedRequest(req);
                                                    }}
                                                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition duration-200 flex items-center gap-1"
                                                >
                                                    <i className="fas fa-check"></i> Accept
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        rejectRequest(req.id);
                                                    }}
                                                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition duration-200 flex items-center gap-1"
                                                    disabled={actionLoading === req.id}
                                                >
                                                    {actionLoading === req.id ? (
                                                        <>
                                                            <i className="fas fa-spinner fa-spin"></i> Rejecting...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="fas fa-times"></i> Reject
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center min-w-[100px]">
                                    <span className={`capitalize font-semibold ${STATUS_COLORS[req.status]}`}>
                                        {STATUS_LABELS[req.status]}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedRequest && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                            <h2 className="text-lg font-bold mb-2">Set Your Price</h2>

                            {typeof selectedRequest.minBudget === "number" && typeof selectedRequest.maxBudget === "number" && (
                                <p className="text-sm text-gray-600 mb-4">
                                    Customer budget: {selectedRequest.minBudget.toLocaleString()} - {selectedRequest.maxBudget.toLocaleString()} EGP
                                </p>
                            )}

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Price (EGP)</label>
                                <input
                                    type="number"
                                    value={offeredPrice}
                                    onChange={(e) => setOfferedPrice(e.target.value)}
                                    className="border w-full p-2 rounded"
                                    placeholder="Enter your price"
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        setSelectedRequest(null);
                                        setOfferedPrice("");
                                    }}
                                    className="px-4 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={acceptRequest}
                                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition flex items-center gap-1"
                                    disabled={priceModalLoading}
                                >
                                    {priceModalLoading ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin"></i> Processing...
                                        </>
                                    ) : (
                                        "Confirm Price"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showReviewForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]">
                        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                                How would you rate your overall experience?
                            </h2>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-3 text-center text-gray-700">
                                    Select a rating
                                </h3>
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className={`text-3xl transition ${
                                                rating >= star ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-3 text-gray-700">
                                    Your review
                                </h3>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-4 text-base h-32 resize-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                    placeholder="Write about your experience..."
                                />
                            </div>

                            <div className="flex justify-between">
                                <button
                                    onClick={() => {
                                        setShowReviewForm(false);
                                        setComment("");
                                        setRating(5);
                                    }}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={submitReview}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg text-lg transition-colors flex items-center gap-2"
                                    disabled={reviewModalLoading}
                                >
                                    {reviewModalLoading ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin"></i> Submitting...
                                        </>
                                    ) : (
                                        "Submit Review"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}