(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_PrivacyPage_page_tsx_75efca._.js", {

"[project]/app/PrivacyPage/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>PrivacyPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$login_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/context/regester/login_context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
function PrivacyPage() {
    _s();
    const [showDeactivate, setShowDeactivate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showDelete, setShowDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { deleteAccount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$login_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginClient"])();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleteMessage, setDeleteMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    if (showDeactivate) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fafafa'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 570,
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                    padding: 24,
                    position: 'relative'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 24
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowDeactivate(false),
                                style: {
                                    fontSize: 22,
                                    fontWeight: 600,
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    lineHeight: 1
                                },
                                "aria-label": "Back",
                                children: "←"
                            }, void 0, false, {
                                fileName: "[project]/app/PrivacyPage/page.tsx",
                                lineNumber: 37,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontWeight: 600
                                },
                                children: "Deactivate my account"
                            }, void 0, false, {
                                fileName: "[project]/app/PrivacyPage/page.tsx",
                                lineNumber: 50,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>window.history.back(),
                                style: {
                                    fontSize: 22,
                                    fontWeight: 600,
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    lineHeight: 1
                                },
                                "aria-label": "Close",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/app/PrivacyPage/page.tsx",
                                lineNumber: 51,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/PrivacyPage/page.tsx",
                        lineNumber: 31,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: 16
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "https://cdn-icons-png.flaticon.com/512/4076/4076549.png",
                            alt: "Break",
                            width: 90,
                            height: 90
                        }, void 0, false, {
                            fileName: "[project]/app/PrivacyPage/page.tsx",
                            lineNumber: 67,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/PrivacyPage/page.tsx",
                        lineNumber: 66,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontWeight: 600,
                            marginBottom: 8
                        },
                        children: "Need a break?"
                    }, void 0, false, {
                        fileName: "[project]/app/PrivacyPage/page.tsx",
                        lineNumber: 70,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: '#444',
                            fontSize: 15,
                            marginBottom: 12
                        },
                        children: "By deactivating your account, both your Service Provider and Customer accounts will be disabled and you will be logged out of the platform."
                    }, void 0, false, {
                        fileName: "[project]/app/PrivacyPage/page.tsx",
                        lineNumber: 71,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: '#444',
                            fontSize: 15,
                            marginBottom: 12
                        },
                        children: "The deactivation process is reversible. You can reactivate your account at any time by simply logging back in. Your data will be exactly as you left it."
                    }, void 0, false, {
                        fileName: "[project]/app/PrivacyPage/page.tsx",
                        lineNumber: 74,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: '#444',
                            fontSize: 15,
                            marginBottom: 24
                        },
                        children: [
                            "If you would like to know your personal data, you can take a look at our ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: '#22c55e',
                                    cursor: 'pointer'
                                },
                                children: "exploratory tool"
                            }, void 0, false, {
                                fileName: "[project]/app/PrivacyPage/page.tsx",
                                lineNumber: 78,
                                columnNumber: 90
                            }, this),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/PrivacyPage/page.tsx",
                        lineNumber: 77,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: {
                            width: '100%',
                            background: '#fff0f0',
                            color: '#ef4444',
                            border: '1px solid #ef4444',
                            borderRadius: 6,
                            padding: '12px 0',
                            fontWeight: 600,
                            fontSize: 16,
                            cursor: 'pointer'
                        },
                        children: "Deactivate Account"
                    }, void 0, false, {
                        fileName: "[project]/app/PrivacyPage/page.tsx",
                        lineNumber: 80,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/PrivacyPage/page.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/PrivacyPage/page.tsx",
            lineNumber: 15,
            columnNumber: 9
        }, this);
    }
    if (showDelete) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fafafa'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 570,
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                    padding: 24,
                    position: 'relative'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 24
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowDelete(false),
                                style: {
                                    fontSize: 22,
                                    fontWeight: 600,
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    lineHeight: 1
                                },
                                "aria-label": "Back",
                                children: "←"
                            }, void 0, false, {
                                fileName: "[project]/app/PrivacyPage/page.tsx",
                                lineNumber: 122,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontWeight: 600
                                },
                                children: "Delete my account"
                            }, void 0, false, {
                                fileName: "[project]/app/PrivacyPage/page.tsx",
                                lineNumber: 135,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>window.history.back(),
                                style: {
                                    fontSize: 22,
                                    fontWeight: 600,
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    lineHeight: 1
                                },
                                "aria-label": "Close",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/app/PrivacyPage/page.tsx",
                                lineNumber: 136,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/PrivacyPage/page.tsx",
                        lineNumber: 116,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: 16
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "https://cdn-icons-png.flaticon.com/512/4076/4076549.png",
                            alt: "Delete",
                            width: 90,
                            height: 90
                        }, void 0, false, {
                            fileName: "[project]/app/PrivacyPage/page.tsx",
                            lineNumber: 152,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/PrivacyPage/page.tsx",
                        lineNumber: 151,
                        columnNumber: 13
                    }, this),
                    isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            marginBottom: 12
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fa fa-spinner fa-spin",
                            style: {
                                fontSize: 24,
                                color: '#ef4444'
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/PrivacyPage/page.tsx",
                            lineNumber: 157,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/PrivacyPage/page.tsx",
                        lineNumber: 156,
                        columnNumber: 17
                    }, this),
                    deleteMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: '#ef4444',
                            textAlign: 'center',
                            marginBottom: 12
                        },
                        children: deleteMessage
                    }, void 0, false, {
                        fileName: "[project]/app/PrivacyPage/page.tsx",
                        lineNumber: 161,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontWeight: 600,
                            marginBottom: 8
                        },
                        children: "We're sorry to see you go!"
                    }, void 0, false, {
                        fileName: "[project]/app/PrivacyPage/page.tsx",
                        lineNumber: 166,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: '#444',
                            fontSize: 15,
                            marginBottom: 12
                        },
                        children: "Before we continue, we want to share some useful information with you."
                    }, void 0, false, {
                        fileName: "[project]/app/PrivacyPage/page.tsx",
                        lineNumber: 167,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        style: {
                            color: '#444',
                            fontSize: 15,
                            marginBottom: 12,
                            paddingLeft: 18
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Your Service Provider and Customer accounts will be permanently deleted from our databases."
                            }, void 0, false, {
                                fileName: "[project]/app/PrivacyPage/page.tsx",
                                lineNumber: 171,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Deletion is irreversible and you will no longer be able to access this data."
                            }, void 0, false, {
                                fileName: "[project]/app/PrivacyPage/page.tsx",
                                lineNumber: 172,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "If you decide to use [app] again, you'll need to create a new account."
                            }, void 0, false, {
                                fileName: "[project]/app/PrivacyPage/page.tsx",
                                lineNumber: 173,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "If you have a non-refundable balance in your account, it will be removed and will not be retrievable after the account is deleted."
                            }, void 0, false, {
                                fileName: "[project]/app/PrivacyPage/page.tsx",
                                lineNumber: 174,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/PrivacyPage/page.tsx",
                        lineNumber: 170,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: '#444',
                            fontSize: 15,
                            marginBottom: 24
                        },
                        children: "If you are considering deleting your account because you no longer provide a service, we would like to offer our assistance. Please contact our support team for help."
                    }, void 0, false, {
                        fileName: "[project]/app/PrivacyPage/page.tsx",
                        lineNumber: 176,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: async ()=>{
                            const confirmDelete = window.confirm("Are you sure you want to delete your account?");
                            if (confirmDelete) {
                                setIsLoading(true);
                                setDeleteMessage(null);
                                const res = await deleteAccount();
                                setIsLoading(false);
                                if (!res.success) {
                                    setDeleteMessage(res.message || "Account deletion failed.");
                                } else {
                                    setDeleteMessage("Your account has been deleted successfully.");
                                }
                            }
                        },
                        style: {
                            width: '100%',
                            background: '#ef4444',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 6,
                            padding: '12px 0',
                            fontWeight: 600,
                            fontSize: 16,
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            textTransform: 'lowercase',
                            opacity: isLoading ? 0.7 : 1
                        },
                        disabled: isLoading,
                        children: isLoading ? "Deleting..." : "delete my account"
                    }, void 0, false, {
                        fileName: "[project]/app/PrivacyPage/page.tsx",
                        lineNumber: 179,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/PrivacyPage/page.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/PrivacyPage/page.tsx",
            lineNumber: 100,
            columnNumber: 9
        }, this);
    }
    // Main Privacy Page
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fafafa'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: 570,
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                padding: 24,
                position: 'relative'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 24
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontWeight: 600,
                                fontSize: 18
                            },
                            children: "Data and Privacy"
                        }, void 0, false, {
                            fileName: "[project]/app/PrivacyPage/page.tsx",
                            lineNumber: 236,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>window.history.back(),
                            style: {
                                fontSize: 22,
                                fontWeight: 600,
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                lineHeight: 1
                            },
                            "aria-label": "Close",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/app/PrivacyPage/page.tsx",
                            lineNumber: 237,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/PrivacyPage/page.tsx",
                    lineNumber: 230,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        borderTop: '1px solid #eee',
                        borderBottom: '1px solid #eee'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>setShowDeactivate(true),
                            style: {
                                padding: '16px 0',
                                borderBottom: '1px solid #eee',
                                cursor: 'pointer'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontWeight: 500
                                    },
                                    children: "Deactivate My Account"
                                }, void 0, false, {
                                    fileName: "[project]/app/PrivacyPage/page.tsx",
                                    lineNumber: 262,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: '#888',
                                        fontSize: 13
                                    },
                                    children: [
                                        "Temporarily deactivate your profile without losing your data.",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/PrivacyPage/page.tsx",
                                            lineNumber: 264,
                                            columnNumber: 82
                                        }, this),
                                        "You can reactivate at any time."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/PrivacyPage/page.tsx",
                                    lineNumber: 263,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/PrivacyPage/page.tsx",
                            lineNumber: 259,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>setShowDelete(true),
                            style: {
                                padding: '16px 0',
                                borderBottom: '1px solid #eee',
                                cursor: 'pointer'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontWeight: 500
                                    },
                                    children: "Delete My Account"
                                }, void 0, false, {
                                    fileName: "[project]/app/PrivacyPage/page.tsx",
                                    lineNumber: 271,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: '#888',
                                        fontSize: 13
                                    },
                                    children: "Permanently delete all your data."
                                }, void 0, false, {
                                    fileName: "[project]/app/PrivacyPage/page.tsx",
                                    lineNumber: 272,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/PrivacyPage/page.tsx",
                            lineNumber: 268,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/PrivacyPage/page.tsx",
                    lineNumber: 255,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/PrivacyPage/page.tsx",
            lineNumber: 220,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/PrivacyPage/page.tsx",
        lineNumber: 219,
        columnNumber: 9
    }, this);
}
_s(PrivacyPage, "pGqqEtutk3mzlpzzN+f8XyLlFvQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$login_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginClient"]
    ];
});
_c = PrivacyPage;
var _c;
__turbopack_refresh__.register(_c, "PrivacyPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/PrivacyPage/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_PrivacyPage_page_tsx_75efca._.js.map