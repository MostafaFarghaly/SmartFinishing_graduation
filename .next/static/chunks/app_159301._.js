(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_159301._.js", {

"[project]/app/context/regester/login_context.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "LoginClientProvider": (()=>LoginClientProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
function LoginClientProvider({ children }) {
    _s();
    const [error, setErrors] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [saveData, setSaveData] = useState(null);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    useEffect({
        "LoginClientProvider.useEffect": ()=>{
            const storedUserData = localStorage.getItem("userData");
            const storedToken = localStorage.getItem("token");
            if (storedUserData) setSaveData(JSON.parse(storedUserData));
            if (storedToken) setToken(storedToken);
        }
    }["LoginClientProvider.useEffect"], []);
    function getUserData(eventInfo) {
        const updated = {
            ...user,
            [eventInfo.target.name]: eventInfo.target.value
        };
        setUser(updated);
    }
    async function sendData() {
        try {
            const { data } = await axios.post(`https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/account/login`, user, {
                validateStatus: ()=>true
            });
            if (data.errors == null) {
                setisLoading(false);
                localStorage.setItem("token", data.token);
                localStorage.setItem("userData", JSON.stringify(data));
                setToken(data.token);
                setSaveData(data);
                window.location.href = "/";
            } else {
                setisLoading(false);
                setErrors(data.errors);
            }
        } catch (error) {
            setisLoading(false);
            setErrors("فشل الاتصال بالخادم.");
        }
    }
    function submitForm(e) {
        e.preventDefault();
        setisLoading(true);
        sendData();
    }
    async function updateProfilePicture(file) {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("لم يتم العثور على التوكن، يرجى تسجيل الدخول مجددًا.");
        }
        try {
            const formData = new FormData();
            formData.append("newProfilePicture", file);
            const response = await fetch("https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/Account/update-profile-picture", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "فشل رفع الصورة");
            }
            const newUrl = await response.text();
            const oldDataRaw = localStorage.getItem("userData");
            if (!oldDataRaw) throw new Error("بيانات المستخدم غير موجودة");
            const oldData = JSON.parse(oldDataRaw);
            const updatedData = {
                ...oldData,
                profilePictureUrl: newUrl
            };
            localStorage.setItem("userData", JSON.stringify(updatedData));
            setSaveData(updatedData);
            return newUrl;
        } catch (error) {
            console.error("فشل رفع الصورة:", error);
            throw error;
        }
    }
    // ✅ هنا الدالة اللي كانت جوه useUpdateAccount بقت مباشرة
    async function updateAccountInfo(updatedFields) {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("لم يتم العثور على التوكن");
        try {
            const response = await fetch("https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/Account/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedFields)
            });
            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "فشل تحديث الحساب");
            }
            let updatedData;
            try {
                updatedData = await response.json();
            } catch  {
                updatedData = updatedFields;
            }
            const oldData = JSON.parse(localStorage.getItem("userData") || "{}");
            const mergedData = {
                ...oldData,
                ...updatedData
            };
            localStorage.setItem("userData", JSON.stringify(mergedData));
            setSaveData(mergedData);
            return mergedData;
        } catch (error) {
            console.error("فشل التحديث:", error);
            throw error;
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoginClientContext.Provider, {
        value: {
            error,
            isLoading,
            getUserData,
            submitForm,
            saveData,
            token,
            updateProfilePicture,
            updateAccountInfo
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/regester/login_context.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_s(LoginClientProvider, "Db9cvMaPMN7Qw77b2kmuBrkZLz0=");
_c = LoginClientProvider;
var _c;
__turbopack_refresh__.register(_c, "LoginClientProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/updateaccount/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>UpdateAccount)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$login_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/context/regester/login_context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature(), _s2 = __turbopack_refresh__.signature(), _s3 = __turbopack_refresh__.signature();
"use client";
;
;
function UpdateAccount() {
    _s();
    const [modalType, setModalType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: "#fafafa",
            padding: "32px 0"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1100,
                    margin: "0 auto",
                    display: "flex",
                    gap: 32,
                    alignItems: "flex-start"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 2,
                            background: "#fff",
                            borderRadius: 12,
                            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                            padding: 32
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    color: "#888",
                                    fontSize: 14,
                                    marginBottom: 8
                                },
                                children: [
                                    "Account > ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "#222"
                                        },
                                        children: "My profile"
                                    }, void 0, false, {
                                        fileName: "[project]/app/updateaccount/page.tsx",
                                        lineNumber: 14,
                                        columnNumber: 26
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/updateaccount/page.tsx",
                                lineNumber: 13,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: 28,
                                    fontWeight: 600,
                                    marginBottom: 32
                                },
                                children: "My profile"
                            }, void 0, false, {
                                fileName: "[project]/app/updateaccount/page.tsx",
                                lineNumber: 16,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileItem, {
                                title: "Profile Information",
                                desc: "Edit your profile picture, name, surname",
                                onClick: ()=>setModalType("profile")
                            }, void 0, false, {
                                fileName: "[project]/app/updateaccount/page.tsx",
                                lineNumber: 17,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileItem, {
                                title: "mobile phone number",
                                desc: "modify your mobile phone number",
                                onClick: ()=>setModalType("phone")
                            }, void 0, false, {
                                fileName: "[project]/app/updateaccount/page.tsx",
                                lineNumber: 18,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileItem, {
                                title: "Address Preferences",
                                desc: "edit your address preference",
                                last: true,
                                onClick: ()=>setModalType("addresses")
                            }, void 0, false, {
                                fileName: "[project]/app/updateaccount/page.tsx",
                                lineNumber: 19,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/updateaccount/page.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 24
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoCard, {
                                title: "Why isn’t my info shown here?",
                                desc: "We’re hiding some account details to protect your identity.",
                                icon: "🙈"
                            }, void 0, false, {
                                fileName: "[project]/app/updateaccount/page.tsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoCard, {
                                title: "Which details can be edited?",
                                desc: "Some details can’t be changed. We may ask for ID verification.",
                                icon: "🔒"
                            }, void 0, false, {
                                fileName: "[project]/app/updateaccount/page.tsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoCard, {
                                title: "What info is shared with others?",
                                desc: "Only released after booking confirmation.",
                                icon: "🔗"
                            }, void 0, false, {
                                fileName: "[project]/app/updateaccount/page.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/updateaccount/page.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/updateaccount/page.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 48,
                    textAlign: "center",
                    color: "#888",
                    fontSize: 13
                },
                children: "2025 Iogo, Inc. · Terms of Use · Privacy Policy · Accessibility · Services"
            }, void 0, false, {
                fileName: "[project]/app/updateaccount/page.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            modalType === "profile" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileModal, {
                onClose: ()=>setModalType(null)
            }, void 0, false, {
                fileName: "[project]/app/updateaccount/page.tsx",
                lineNumber: 33,
                columnNumber: 35
            }, this),
            modalType === "phone" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhoneModal, {
                onClose: ()=>setModalType(null)
            }, void 0, false, {
                fileName: "[project]/app/updateaccount/page.tsx",
                lineNumber: 34,
                columnNumber: 33
            }, this),
            modalType === "addresses" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AddressModal, {
                onClose: ()=>setModalType(null)
            }, void 0, false, {
                fileName: "[project]/app/updateaccount/page.tsx",
                lineNumber: 35,
                columnNumber: 37
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/updateaccount/page.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(UpdateAccount, "4YXCq5ZeVU6RD/09v2xqM27kFeY=");
_c = UpdateAccount;
function ProfileItem({ title, desc, last, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            borderBottom: last ? "none" : "1px solid #eee",
            padding: "20px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: onClick ? "pointer" : "default"
        },
        onClick: onClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontWeight: 500,
                            fontSize: 17
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/app/updateaccount/page.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: "#888",
                            fontSize: 14
                        },
                        children: desc
                    }, void 0, false, {
                        fileName: "[project]/app/updateaccount/page.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/updateaccount/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: 22,
                    color: "#bbb"
                },
                children: "›"
            }, void 0, false, {
                fileName: "[project]/app/updateaccount/page.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/updateaccount/page.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c1 = ProfileItem;
function InfoCard({ title, desc, icon }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            padding: 24,
            display: "flex",
            gap: 16,
            alignItems: "flex-start"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 28,
                    background: "#f2f6f7",
                    borderRadius: "50%",
                    width: 44,
                    height: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                },
                children: icon
            }, void 0, false, {
                fileName: "[project]/app/updateaccount/page.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontWeight: 500,
                            marginBottom: 8
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/app/updateaccount/page.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: "#888",
                            fontSize: 14
                        },
                        children: desc
                    }, void 0, false, {
                        fileName: "[project]/app/updateaccount/page.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/updateaccount/page.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/updateaccount/page.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_c2 = InfoCard;
function ProfileModal({ onClose }) {
    _s1();
    const { updateAccountInfo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$login_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginClient"])();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [companyName, setCompanyName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProfileModal.useEffect": ()=>{
            const data = localStorage.getItem("userData");
            if (data) {
                const user = JSON.parse(data);
                setName(user.displayName || "");
                setCompanyName(user.companyName || "");
            }
        }
    }["ProfileModal.useEffect"], []);
    const handleSave = async ()=>{
        try {
            await updateAccountInfo({
                displayName: name,
                companyName
            });
            onClose();
        } catch (err) {
            alert("فشل التحديث: " + err.message);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: modalBackdropStyle,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: modalContainerStyle,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    style: closeBtnStyle,
                    children: "✕"
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    style: {
                        fontWeight: 600,
                        fontSize: 20
                    },
                    children: "Edit Personal Info"
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    children: "Name"
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: name,
                    onChange: (e)=>setName(e.target.value),
                    style: inputStyle
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    children: "Company Name"
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 97,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: companyName,
                    onChange: (e)=>setCompanyName(e.target.value),
                    style: inputStyle
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    style: saveBtnStyle,
                    onClick: handleSave,
                    children: "Save"
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/updateaccount/page.tsx",
            lineNumber: 92,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/updateaccount/page.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
_s1(ProfileModal, "o4Befm7PfgPue64uB9WCXGkA4uE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$login_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginClient"]
    ];
});
_c3 = ProfileModal;
function PhoneModal({ onClose }) {
    _s2();
    const { updateAccountInfo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$login_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginClient"])();
    const [phoneNumber, setPhoneNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PhoneModal.useEffect": ()=>{
            const data = localStorage.getItem("userData");
            if (data) {
                const user = JSON.parse(data);
                setPhoneNumber(user.phoneNumber || "");
            }
        }
    }["PhoneModal.useEffect"], []);
    const handleSave = async ()=>{
        try {
            await updateAccountInfo({
                phoneNumber
            });
            onClose();
        } catch (err) {
            alert("فشل التحديث: " + err.message);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: modalBackdropStyle,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: modalContainerStyle,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    style: closeBtnStyle,
                    children: "✕"
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    style: {
                        fontWeight: 600,
                        fontSize: 20
                    },
                    children: "Edit Phone Number"
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    children: "Phone Number"
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: phoneNumber,
                    onChange: (e)=>setPhoneNumber(e.target.value),
                    style: inputStyle
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    style: saveBtnStyle,
                    onClick: handleSave,
                    children: "Save"
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/updateaccount/page.tsx",
            lineNumber: 128,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/updateaccount/page.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
_s2(PhoneModal, "pSKgrotwxQ4ZcMMOpK+uB0ONQic=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$login_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginClient"]
    ];
});
_c4 = PhoneModal;
function AddressModal({ onClose }) {
    _s3();
    const { updateAccountInfo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$login_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginClient"])();
    const [address, setAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [cityName, setCityName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [buildingNumber, setBuildingNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AddressModal.useEffect": ()=>{
            const data = localStorage.getItem("userData");
            if (data) {
                const user = JSON.parse(data);
                setAddress(user.address || "");
                setCityName(user.cityName || "");
                setBuildingNumber(user.buildingNumber || "");
            }
        }
    }["AddressModal.useEffect"], []);
    const handleSave = async ()=>{
        try {
            await updateAccountInfo({
                address,
                cityName,
                buildingNumber
            });
            onClose();
        } catch (err) {
            alert("فشل التحديث: " + err.message);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: modalBackdropStyle,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: modalContainerStyle,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    style: closeBtnStyle,
                    children: "✕"
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 167,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    style: {
                        fontWeight: 600,
                        fontSize: 20
                    },
                    children: "Edit Address Information"
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    children: "Address"
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: address,
                    onChange: (e)=>setAddress(e.target.value),
                    style: inputStyle
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 170,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    children: "City"
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 171,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: cityName,
                    onChange: (e)=>setCityName(e.target.value),
                    style: inputStyle
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 172,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    children: "Building Number"
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 173,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: buildingNumber,
                    onChange: (e)=>setBuildingNumber(e.target.value),
                    style: inputStyle
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 174,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    style: saveBtnStyle,
                    onClick: handleSave,
                    children: "Save"
                }, void 0, false, {
                    fileName: "[project]/app/updateaccount/page.tsx",
                    lineNumber: 175,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/updateaccount/page.tsx",
            lineNumber: 166,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/updateaccount/page.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, this);
}
_s3(AddressModal, "mMEq0BN4+mNQC9o2+av5B01ydmo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$login_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginClient"]
    ];
});
_c5 = AddressModal;
const inputStyle = {
    width: "100%",
    borderRadius: 6,
    border: "1px solid #eee",
    fontSize: 16,
    padding: "10px 12px",
    outline: "none",
    fontWeight: 500,
    boxSizing: "border-box"
};
const saveBtnStyle = {
    padding: "10px 24px",
    borderRadius: 6,
    border: "none",
    background: "#22c55e",
    color: "#fff",
    fontWeight: 500,
    cursor: "pointer",
    marginTop: 12,
    alignSelf: "flex-end"
};
const modalBackdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.15)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "flex-end"
};
const modalContainerStyle = {
    background: "#fff",
    width: 400,
    height: "100%",
    borderRadius: "16px 0 0 16px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    padding: 32,
    display: "flex",
    flexDirection: "column",
    gap: 16
};
const closeBtnStyle = {
    position: "absolute",
    top: 16,
    right: 16,
    background: "none",
    border: "none",
    fontSize: 22,
    cursor: "pointer",
    color: "#888"
};
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_refresh__.register(_c, "UpdateAccount");
__turbopack_refresh__.register(_c1, "ProfileItem");
__turbopack_refresh__.register(_c2, "InfoCard");
__turbopack_refresh__.register(_c3, "ProfileModal");
__turbopack_refresh__.register(_c4, "PhoneModal");
__turbopack_refresh__.register(_c5, "AddressModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/updateaccount/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_159301._.js.map