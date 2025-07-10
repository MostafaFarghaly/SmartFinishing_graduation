(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_3027dd._.js", {

"[project]/app/viewprofile/[id]/portfolio/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>AllPortfolioPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$login_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/context/regester/login_context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$ApiContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/context/ApiContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$token_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/context/token_context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
function AllPortfolioPage() {
    _s();
    const { token, saveData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$login_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginClient"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const id = params?.id;
    const { userData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$token_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToken"])();
    const [portfolios, setPortfolios] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const { baseUrl } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$ApiContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"])();
    const userRole = userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";
    const isOwnProfile = userRole === "Worker" && id === String(saveData?.workerId);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AllPortfolioPage.useEffect": ()=>{
            if (!token || !id) return;
            const fetchPortfolios = {
                "AllPortfolioPage.useEffect.fetchPortfolios": async ()=>{
                    try {
                        const res = await fetch(`${baseUrl}/api/Profile/workers/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                Accept: "application/json"
                            }
                        });
                        if (!res.ok) throw new Error("فشل في جلب البيانات");
                        const data = await res.json();
                        setPortfolios(data.portfolioItems || []);
                    } catch (err) {
                        console.error("❌ Error fetching portfolio:", err);
                    } finally{
                        setLoading(false);
                    }
                }
            }["AllPortfolioPage.useEffect.fetchPortfolios"];
            fetchPortfolios();
        }
    }["AllPortfolioPage.useEffect"], [
        token,
        id
    ]);
    // باقي الدوال handleDelete, handleDeleteImage, handleEdit, handleAddImages تبقى كما هي
    const handleDelete = async (portfolioId)=>{
        if (!confirm("هل أنت متأكد أنك تريد حذف هذا البورتفوليو؟")) return;
        try {
            const res = await fetch(`${baseUrl}/api/Portfolio/${portfolioId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            });
            if (!res.ok) throw new Error("فشل في حذف البورتفوليو");
            setPortfolios((prev)=>prev.filter((item)=>item.id !== portfolioId));
        } catch (err) {
            console.error("❌ Error deleting portfolio:", err);
        }
    };
    const handleDeleteImage = async (portfolioId, imageId)=>{
        if (!confirm("هل تريد حذف هذه الصورة؟")) return;
        try {
            const res = await fetch(`${baseUrl}/api/Portfolio/${portfolioId}/images/${imageId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`فشل في حذف الصورة - رمز الحالة: ${res.status}, الرسالة: ${errorText}`);
            }
            console.log("تم حذف الصورة بنجاح");
            setPortfolios((prev)=>prev.map((portfolio)=>portfolio.id === portfolioId ? {
                        ...portfolio,
                        imageUrls: portfolio.imageUrls.filter((img)=>img.id !== imageId)
                    } : portfolio));
        } catch (err) {
            console.error("❌ Error deleting image:", err.message || err);
        }
    };
    const handleEdit = (id)=>{
        router.push(`/edit-portfolio/${id}`);
    };
    const handleAddImages = (id)=>{
        router.push(`/add-portfolio-images/${id}`);
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 text-center text-gray-600 font-medium",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
            className: "fa fa-spinner fa-spin"
        }, void 0, false, {
            fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
            lineNumber: 119,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
        lineNumber: 118,
        columnNumber: 7
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 bg-white min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold mb-6 text-center text-green-700",
                children: "جميع عناصر البورتفوليو"
            }, void 0, false, {
                fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            portfolios.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-center text-gray-500",
                children: "لا يوجد عناصر لعرضها."
            }, void 0, false, {
                fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                lineNumber: 130,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
                children: portfolios.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border rounded-lg p-2 shadow relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-semibold text-sm text-green-800 truncate",
                                        children: item.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                                        lineNumber: 136,
                                        columnNumber: 17
                                    }, this),
                                    isOwnProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleEdit(item.id),
                                                className: "text-blue-600 hover:text-blue-800 text-xs",
                                                title: "تعديل",
                                                children: "✏️"
                                            }, void 0, false, {
                                                fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                                                lineNumber: 140,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleDelete(item.id),
                                                className: "text-red-500 hover:text-red-700 text-xs",
                                                title: "حذف",
                                                children: "🗑️"
                                            }, void 0, false, {
                                                fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                                                lineNumber: 147,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                                        lineNumber: 139,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                                lineNumber: 135,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-600 mb-2 truncate",
                                children: item.description
                            }, void 0, false, {
                                fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                                lineNumber: 158,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-1 mb-2",
                                children: item.imageUrls?.map((imgUrl, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: typeof imgUrl === "string" ? imgUrl : imgUrl.imageUrl,
                                                alt: "portfolio image",
                                                width: 100,
                                                height: 100,
                                                className: "rounded object-cover w-full h-24"
                                            }, void 0, false, {
                                                fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                                                lineNumber: 163,
                                                columnNumber: 21
                                            }, this),
                                            isOwnProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    console.log("حذف صورة:", {
                                                        portfolioId: item.id,
                                                        imageIndex: index
                                                    });
                                                // لاحظ هنا، لازم تعدل handleDeleteImage تقبل index بدل id لو الصور بدون id
                                                },
                                                className: "absolute top-1 right-1 bg-white text-red-600 rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition",
                                                title: "حذف الصورة",
                                                children: "🗑️"
                                            }, void 0, false, {
                                                fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                                                lineNumber: 171,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, `${item.id}-img-${index}`, true, {
                                        fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                                lineNumber: 160,
                                columnNumber: 15
                            }, this),
                            isOwnProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleAddImages(item.id),
                                className: "w-full bg-gray-100 hover:bg-gray-200 text-xs py-1 rounded text-gray-700",
                                children: "➕ إضافة صور"
                            }, void 0, false, {
                                fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                                lineNumber: 188,
                                columnNumber: 17
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                        lineNumber: 134,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                lineNumber: 132,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.back(),
                    className: "bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-sm",
                    children: "Back"
                }, void 0, false, {
                    fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                    lineNumber: 201,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/viewprofile/[id]/portfolio/page.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
} // "use client";
 // import React, { useEffect, useState } from "react";
 // import Image from "next/image";
 // import { useRouter } from "next/navigation";
 // import { useLoginClient } from "../../../context/regester/login_context";
 // import { useApi } from "../../../context/ApiContext";
 // import { useToken } from "../../../context/token_context";
 // export default function AllPortfolioPage() {
 //   const { token, saveData } = useLoginClient();
 //   const { userData } = useToken();
 //   const { baseUrl } = useApi();
 //   const router = useRouter();
 //   const [portfolios, setPortfolios] = useState([]);
 //   const [loading, setLoading] = useState(true);
 //   const userRole =
 //     userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";
 //   const isOwnProfile = userRole === "Worker";
 //  useEffect(() => {
 //   if (!token) return;
 //   const fetchPortfolios = async () => {
 //     try {
 //       const res = await fetch(`${baseUrl}/api/Portfolio`, {
 //         headers: {
 //           Authorization: `Bearer ${token}`,
 //           Accept: "application/json",
 //         },
 //       });
 //       if (!res.ok) {
 //         const errText = await res.text();
 //         throw new Error(`فشل في جلب البيانات: ${res.status} - ${errText}`);
 //       }
 //       const data = await res.json();
 //       setPortfolios(data || []);
 //     } catch (err) {
 //       console.error("❌ Error fetching portfolios:", err);
 //     } finally {
 //       setLoading(false);
 //     }
 //   };
 //   fetchPortfolios();
 // }, [token]);
 //   const handleDelete = async (portfolioId: number) => {
 //     if (!confirm("هل أنت متأكد أنك تريد حذف هذا البورتفوليو؟")) return;
 //     try {
 //       const res = await fetch(`${baseUrl}/api/Portfolio/${portfolioId}`, {
 //         method: "DELETE",
 //         headers: {
 //           Authorization: `Bearer ${token}`,
 //           Accept: "application/json",
 //         },
 //       });
 //       if (!res.ok) throw new Error("فشل في حذف البورتفوليو");
 //       setPortfolios((prev) => prev.filter((item) => item.id !== portfolioId));
 //     } catch (err) {
 //       console.error("❌ Error deleting portfolio:", err);
 //     }
 //   };
 //   const handleDeleteImage = async (portfolioId: number, imageId: number) => {
 //     if (!confirm("هل تريد حذف هذه الصورة؟")) return;
 //     try {
 //       const res = await fetch(
 //         `${baseUrl}/api/Portfolio/${portfolioId}/images/${imageId}`,
 //         {
 //           method: "DELETE",
 //           headers: {
 //             Authorization: `Bearer ${token}`,
 //             Accept: "application/json",
 //           },
 //         }
 //       );
 //       if (!res.ok) {
 //         const errorText = await res.text();
 //         throw new Error(`فشل في حذف الصورة: ${errorText}`);
 //       }
 //       setPortfolios((prev) =>
 //         prev.map((portfolio) =>
 //           portfolio.id === portfolioId
 //             ? {
 //                 ...portfolio,
 //                 imageUrls: portfolio.imageUrls.filter((img) => img.id !== imageId),
 //               }
 //             : portfolio
 //         )
 //       );
 //     } catch (err: any) {
 //       console.error("❌ Error deleting image:", err.message || err);
 //     }
 //   };
 //   const handleEdit = (id: number) => {
 //     router.push(`/edit-portfolio/${id}`);
 //   };
 //   const handleAddImages = (id: number) => {
 //     router.push(`/add-portfolio-images/${id}`);
 //   };
 //   if (loading) return <div className="p-4">جاري التحميل...</div>;
 //   return (
 //     <div className="p-4 bg-white min-h-screen">
 //       <h1 className="text-2xl font-bold mb-6 text-center text-green-700">
 //         جميع عناصر البورتفوليو
 //       </h1>
 //       {portfolios.length === 0 ? (
 //         <p className="text-center text-gray-500">لا يوجد عناصر لعرضها.</p>
 //       ) : (
 //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
 //           {portfolios.map((item) => (
 //             <div key={item.id} className="border rounded-lg p-2 shadow relative">
 //               <div className="flex justify-between items-center mb-1">
 //                 <h2 className="font-semibold text-sm text-green-800 truncate">
 //                   {item.name}
 //                 </h2>
 //                 {isOwnProfile && (
 //                   <div className="flex gap-2">
 //                     <button
 //                       onClick={() => handleEdit(item.id)}
 //                       className="text-blue-600 hover:text-blue-800 text-xs"
 //                       title="تعديل"
 //                     >
 //                       ✏️
 //                     </button>
 //                     <button
 //                       onClick={() => handleDelete(item.id)}
 //                       className="text-red-500 hover:text-red-700 text-xs"
 //                       title="حذف"
 //                     >
 //                       🗑️
 //                     </button>
 //                   </div>
 //                 )}
 //               </div>
 //               <p className="text-xs text-gray-600 mb-2 truncate">
 //                 {item.description}
 //               </p>
 //               <div className="grid grid-cols-2 gap-1 mb-2">
 //                 {item.imageUrls?.map((img) => (
 //                   <div key={img.id} className="relative group">
 //                     <Image
 //                       src={img.imageUrl}
 //                       alt="portfolio image"
 //                       width={100}
 //                       height={100}
 //                       className="rounded object-cover w-full h-24"
 //                     />
 //                     {isOwnProfile && (
 //                       <button
 //                         onClick={() => handleDeleteImage(item.id, img.id)}
 //                         className="absolute top-1 right-1 bg-white text-red-600 rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
 //                         title="حذف الصورة"
 //                       >
 //                         🗑️
 //                       </button>
 //                     )}
 //                   </div>
 //                 ))}
 //               </div>
 //               {isOwnProfile && (
 //                 <button
 //                   onClick={() => handleAddImages(item.id)}
 //                   className="w-full bg-gray-100 hover:bg-gray-200 text-xs py-1 rounded text-gray-700"
 //                 >
 //                   ➕ إضافة صور
 //                 </button>
 //               )}
 //             </div>
 //           ))}
 //         </div>
 //       )}
 //       <div className="mt-6 text-center">
 //         <button
 //           onClick={() => router.back()}
 //           className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-sm"
 //         >
 //           الرجوع
 //         </button>
 //       </div>
 //     </div>
 //   );
 // }
_s(AllPortfolioPage, "tU7O+gW9k0Mfw5K7OuD5OqaIpd8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$login_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$token_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToken"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$ApiContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"]
    ];
});
_c = AllPortfolioPage;
var _c;
__turbopack_refresh__.register(_c, "AllPortfolioPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/viewprofile/[id]/portfolio/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
"[project]/node_modules/next/dist/shared/lib/image-external.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    getImageProps: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    getImageProps: function() {
        return getImageProps;
    }
});
const _interop_require_default = __turbopack_require__("[project]/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _getimgprops = __turbopack_require__("[project]/node_modules/next/dist/shared/lib/get-img-props.js [app-client] (ecmascript)");
const _imagecomponent = __turbopack_require__("[project]/node_modules/next/dist/client/image-component.js [app-client] (ecmascript)");
const _imageloader = /*#__PURE__*/ _interop_require_default._(__turbopack_require__("[project]/node_modules/next/dist/shared/lib/image-loader.js [app-client] (ecmascript)"));
function getImageProps(imgProps) {
    const { props } = (0, _getimgprops.getImgProps)(imgProps, {
        defaultLoader: _imageloader.default,
        // This is replaced by webpack define plugin
        imgConf: ("TURBOPACK compile-time value", JSON.parse('{"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","dangerouslyAllowSVG":false,"unoptimized":false,"domains":[],"remotePatterns":[{"protocol":"https","hostname":"projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net","pathname":"/resources/**"},{"protocol":"https","hostname":"projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net","pathname":"/images/services/**"}]}'))
    });
    // Normally we don't care about undefined props because we pass to JSX,
    // but this exported function could be used by the end user for anything
    // so we delete undefined props to clean it up a little.
    for (const [key, value] of Object.entries(props)){
        if (value === undefined) {
            delete props[key];
        }
    }
    return {
        props
    };
}
const _default = _imagecomponent.Image; //# sourceMappingURL=image-external.js.map
}}),
"[project]/node_modules/next/image.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
module.exports = __turbopack_require__("[project]/node_modules/next/dist/shared/lib/image-external.js [app-client] (ecmascript)");
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
module.exports = __turbopack_require__("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_3027dd._.js.map