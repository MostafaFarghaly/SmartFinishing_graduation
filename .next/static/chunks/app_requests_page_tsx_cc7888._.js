(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_requests_page_tsx_cc7888._.js", {

"[project]/app/requests/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>RequestsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$ApiContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/context/ApiContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$token_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/context/token_context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$login_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/context/regester/login_context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
const STATUS_LABELS = {
    Pending: "pending",
    Accepted: "accepted",
    Completed: "completed",
    Cancelled: "cancelled",
    Rejected: "rejected"
};
const STATUS_COLORS = {
    Pending: "text-yellow-500",
    Accepted: "text-green-600",
    Completed: "text-gray-500",
    Cancelled: "text-red-600",
    Rejected: "text-red-700"
};
const TABS = [
    {
        label: "All",
        value: "all"
    },
    {
        label: "Pending",
        value: "Pending"
    },
    {
        label: "Accepted",
        value: "Accepted"
    },
    {
        label: "Completed",
        value: "Completed"
    },
    {
        label: "Cancelled",
        value: "Cancelled"
    },
    {
        label: "Rejected",
        value: "Rejected"
    }
];
function RequestsPage() {
    _s();
    const { baseUrl } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$ApiContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"])();
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [selectedRequest, setSelectedRequest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [offeredPrice, setOfferedPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showReviewForm, setShowReviewForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reviewRequestId, setReviewRequestId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [comment, setComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [rating, setRating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(5);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [actionLoading, setActionLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { userData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$token_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToken"])();
    const { saveData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$login_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginClient"])();
    const role = userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";
    const isCustomer = role.toLowerCase() === "customer";
    const isWorker = role.toLowerCase() === "worker";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RequestsPage.useEffect": ()=>{
            const fetchRequests = {
                "RequestsPage.useEffect.fetchRequests": async ()=>{
                    try {
                        const token = localStorage.getItem("token");
                        if (!token || !isCustomer && !isWorker) return;
                        const url = isCustomer ? `${baseUrl}/api/Requests/customer-requests` : `${baseUrl}/api/Requests/received-requests`;
                        const res = await fetch(url, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        if (!res.ok) {
                            const errorText = await res.text();
                            throw new Error(`فشل في جلب الطلبات: ${res.status} - ${errorText}`);
                        }
                        const data = await res.json();
                        setRequests(data);
                    // console.log("Fetched requests:", data);
                    } catch (err) {
                        setError(err.message || "حدث خطأ");
                    } finally{
                        setLoading(false);
                    }
                }
            }["RequestsPage.useEffect.fetchRequests"];
            fetchRequests();
        }
    }["RequestsPage.useEffect"], [
        baseUrl,
        isCustomer,
        isWorker
    ]);
    const cancelRequest = async (requestId)=>{
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${baseUrl}/api/Requests/customer-cancel/${requestId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) throw new Error("Failed to cancel the request");
            const updated = await res.json();
            setRequests((prev)=>prev.map((req)=>req.id === requestId ? {
                        ...req,
                        status: updated.status
                    } : req));
            setMessage("✅ Request cancelled successfully");
        } catch (err) {
            setMessage("❌ " + err.message);
        }
    };
    const acceptRequest = async ()=>{
        if (!selectedRequest?.id || !offeredPrice) return;
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${baseUrl}/api/Requests/worker-accept/${selectedRequest.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Number(offeredPrice))
            });
            if (!res.ok) throw new Error("Failed to accept the request");
            const updated = await res.json();
            setRequests((prev)=>prev.map((req)=>req.id === selectedRequest.id ? {
                        ...req,
                        status: updated.status,
                        workerOfferedPrice: Number(offeredPrice)
                    } : req));
            setMessage("✅ Request accepted");
            setSelectedRequest(null);
            setOfferedPrice("");
        } catch (err) {
            setMessage("❌ " + err.message);
        }
    };
    const rejectRequest = async (requestId)=>{
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${baseUrl}/api/Requests/worker-reject/${requestId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error("Failed to reject the request");
            const updated = await res.json();
            setRequests((prev)=>prev.map((req)=>req.id === requestId ? {
                        ...req,
                        status: updated.status
                    } : req));
            setMessage("❌ Request rejected");
        } catch (err) {
            setMessage("❌ " + err.message);
        }
    };
    const approveRequest = async (requestId)=>{
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${baseUrl}/api/Requests/customer-approve/${requestId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(true)
            });
            if (!res.ok) throw new Error("Failed to approve the price");
            const updated = await res.json();
            setRequests((prev)=>prev.map((req)=>req.id === requestId ? {
                        ...req,
                        status: updated.status,
                        finalAgreedPrice: updated.finalAgreedPrice
                    } : req));
            setMessage("✅ Price approved successfully");
        } catch (err) {
            setMessage("❌ " + err.message);
        }
    };
    const declinePrice = async (requestId)=>{
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${baseUrl}/api/Requests/customer-approve/${requestId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(false)
            });
            if (!res.ok) throw new Error("Failed to reject the price");
            const updated = await res.json();
            setRequests((prev)=>prev.map((req)=>req.id === requestId ? {
                        ...req,
                        status: updated.status
                    } : req));
            setMessage("❌ Price rejected");
        } catch (err) {
            setMessage("❌ " + err.message);
        }
    };
    const markAsCompleted = async (requestId)=>{
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${baseUrl}/api/Requests/mark-completed/${requestId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Error ${res.status}: ${text}`);
            }
            const updated = await res.json();
            setRequests((prev)=>prev.map((r)=>r.id === requestId ? {
                        ...r,
                        status: updated.status
                    } : r));
            setMessage("✅ Request marked as completed");
        } catch (err) {
            setMessage("❌ " + err.message);
        }
    };
    const submitReview = async ()=>{
        if (!reviewRequestId || !comment || rating < 1 || rating > 5) {
            setMessage("Please fill in all fields correctly");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const request = requests.find((r)=>r.id === reviewRequestId);
            if (!request?.workerId) throw new Error("No valid workerId found");
            const res = await fetch(`${baseUrl}/api/Reviews`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    workerId: request.workerId,
                    comment,
                    rating
                })
            });
            if (!res.ok) throw new Error("Failed to submit the review");
            setMessage("✅ Review submitted successfully");
            setShowReviewForm(false);
            setReviewRequestId(null);
            setComment("");
            setRating(5);
        } catch (err) {
            setMessage("❌ " + err.message);
        }
    };
    const handleAction = async (action, requestId)=>{
        setActionLoading(requestId);
        try {
            await action(requestId);
        } finally{
            setActionLoading(null);
        }
    };
    const filteredRequests = tab === "all" ? requests : requests.filter((req)=>req.status === tab);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center py-20 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-16 w-16 border-4 border-t-green-600 border-gray-300 mb-4"
            }, void 0, false, {
                fileName: "[project]/app/requests/page.tsx",
                lineNumber: 318,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold text-gray-700",
                children: "جارٍ تحميل البيانات..."
            }, void 0, false, {
                fileName: "[project]/app/requests/page.tsx",
                lineNumber: 319,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-400 mt-1",
                children: "يرجى الانتظار قليلًا"
            }, void 0, false, {
                fileName: "[project]/app/requests/page.tsx",
                lineNumber: 320,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/requests/page.tsx",
        lineNumber: 317,
        columnNumber: 9
    }, this);
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 text-red-600",
        children: [
            "خطأ: ",
            error
        ]
    }, void 0, true, {
        fileName: "[project]/app/requests/page.tsx",
        lineNumber: 323,
        columnNumber: 23
    }, this);
}
_s(RequestsPage, "7dmg0DoPph5vpuw8mnPYTG+Z3hU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$ApiContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$token_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToken"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$login_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginClient"]
    ];
});
_c = RequestsPage;
var _c;
__turbopack_refresh__.register(_c, "RequestsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/requests/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_requests_page_tsx_cc7888._.js.map