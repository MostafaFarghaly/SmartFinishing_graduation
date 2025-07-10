(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_070f08._.js", {

"[project]/app/context/regester/signupclient_context.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "SignUpClientProvider": (()=>SignUpClientProvider),
    "useSignUpClient": (()=>useSignUpClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)"); // ← استخدمنا NextAuth
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
"use client";
;
;
;
const SignUpClientContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
function SignUpClientProvider({ children }) {
    _s();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [cities, setCities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        address: "",
        buildingNumber: "",
        cityId: "",
        age: "",
        profilePicture: null
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SignUpClientProvider.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/Cities").then({
                "SignUpClientProvider.useEffect": (res)=>setCities(res.data)
            }["SignUpClientProvider.useEffect"]).catch({
                "SignUpClientProvider.useEffect": (err)=>console.error(err)
            }["SignUpClientProvider.useEffect"]);
        }
    }["SignUpClientProvider.useEffect"], []);
    function getUserData(e) {
        const { name, value, files } = e.target;
        if (name === "profilePicture") {
            setUser((prev)=>({
                    ...prev,
                    profilePicture: files[0]
                }));
        } else {
            setUser((prev)=>({
                    ...prev,
                    [name]: value
                }));
        }
    }
    async function sendData() {
        const formData = new FormData();
        formData.append("Name", user.name);
        formData.append("Email", user.email);
        formData.append("Password", user.password);
        formData.append("ConfirmPassword", user.confirmPassword);
        formData.append("PhoneNumber", user.phoneNumber);
        formData.append("Address", user.address);
        formData.append("BuildingNumber", user.buildingNumber);
        formData.append("CityId", user.cityId);
        if (user.age) formData.append("Age", user.age);
        if (user.profilePicture) formData.append("ProfilePicture", user.profilePicture);
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/account/register/customer", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            validateStatus: ()=>true
        });
        if (!data.errors) {
            setIsLoading(false);
            // ← بعد النجاح، نسجل دخول مباشرة باستخدام credentials من NextAuth
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signIn"])("credentials", {
                redirect: true,
                email: user.email,
                password: user.password,
                callbackUrl: "/"
            });
        } else {
            setIsLoading(false);
            setError(data.errors);
        }
    }
    function submitForm(e) {
        e.preventDefault();
        setIsLoading(true);
        sendData();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SignUpClientContext.Provider, {
        value: {
            error,
            cities,
            isLoading,
            user,
            getUserData,
            submitForm
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/regester/signupclient_context.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(SignUpClientProvider, "U6FXZoeFn4QqlIzm5XTo6AEM+0M=");
_c = SignUpClientProvider;
function useSignUpClient() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SignUpClientContext);
    if (!context) {
        throw new Error("useSignUpClient must be used within a SignUpClientProvider");
    }
    return context;
}
_s1(useSignUpClient, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_refresh__.register(_c, "SignUpClientProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(auth)/signUpClient/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>SignUpClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$signupclient_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/context/regester/signupclient_context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
function SignUpClient() {
    _s();
    const { error, cities, isLoading, user, getUserData, submitForm } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$signupclient_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSignUpClient"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const nextStep = (e)=>{
        e.preventDefault();
        setStep(2);
    };
    const prevStep = (e)=>{
        e.preventDefault();
        setStep(1);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen items-center justify-center bg-gray-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex w-full max-w-4xl bg-white shadow-lg rounded-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-10/12 p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-bold my-text-green mb-1",
                            children: "Sign Up Client"
                        }, void 0, false, {
                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                            lineNumber: 27,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 mb-1",
                            children: "Let’s get you all set up so you can access your personal account"
                        }, void 0, false, {
                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-red-600 text-sm space-y-1 mb-3",
                            children: Array.isArray(error) ? error.map((err, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: err
                                }, idx, false, {
                                    fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                    lineNumber: 34,
                                    columnNumber: 65
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                lineNumber: 34,
                                columnNumber: 91
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                            lineNumber: 33,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            className: "space-y-4",
                            onSubmit: step === 2 ? submitForm : nextStep,
                            children: [
                                step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "name",
                                            value: user.name,
                                            onChange: getUserData,
                                            placeholder: "Full Name",
                                            className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                            lineNumber: 42,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "email",
                                            type: "email",
                                            value: user.email,
                                            onChange: getUserData,
                                            placeholder: "Email",
                                            className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                            lineNumber: 50,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "password",
                                            type: "password",
                                            value: user.password,
                                            onChange: getUserData,
                                            placeholder: "Password",
                                            className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                            lineNumber: 59,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "confirmPassword",
                                            type: "password",
                                            value: user.confirmPassword,
                                            onChange: getUserData,
                                            placeholder: "Confirm Password",
                                            className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                            lineNumber: 68,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "phoneNumber",
                                            value: user.phoneNumber,
                                            onChange: getUserData,
                                            placeholder: "Phone Number",
                                            className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                            lineNumber: 77,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors",
                                            children: "Next"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                            lineNumber: 86,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true),
                                step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "address",
                                            value: user.address,
                                            onChange: getUserData,
                                            placeholder: "Address",
                                            className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                            lineNumber: 98,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "buildingNumber",
                                            value: user.buildingNumber,
                                            onChange: getUserData,
                                            placeholder: "Building Number",
                                            className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                            lineNumber: 106,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "cityId",
                                            value: user.cityId,
                                            onChange: getUserData,
                                            className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500",
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select a city"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 21
                                                }, this),
                                                cities.map((city)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: city.id,
                                                        children: city.name
                                                    }, city.id, false, {
                                                        fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 25
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                            lineNumber: 114,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "age",
                                            type: "number",
                                            value: user.age,
                                            onChange: getUserData,
                                            placeholder: "Age",
                                            className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                            lineNumber: 128,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "profilePicture",
                                            type: "file",
                                            accept: "image/*",
                                            onChange: getUserData,
                                            className: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                            lineNumber: 136,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: prevStep,
                                                    className: "w-1/2 bg-gray-300 text-gray-700 py-1 rounded-lg hover:bg-gray-400 transition-colors",
                                                    children: "Previous"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: "w-1/2 bg-green-600 text-white py-1 rounded-lg hover:bg-green-700 transition-colors",
                                                    children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "fa fa-spinner fa-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 38
                                                    }, this) : "Create Account"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                            lineNumber: 144,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                            lineNumber: 38,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-sm text-center text-gray-500",
                            children: [
                                "Already have an account?",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    className: "text-green-500 hover:underline",
                                    children: "Sign in"
                                }, void 0, false, {
                                    fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                    lineNumber: 26,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-50 bg-green-50 flex items-center justify-center p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/images/signup.png",
                        alt: "Sign Up",
                        width: 550,
                        height: 550,
                        className: "mx-auto"
                    }, void 0, false, {
                        fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                        lineNumber: 172,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(auth)/signUpClient/page.tsx",
                    lineNumber: 171,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(auth)/signUpClient/page.tsx",
            lineNumber: 24,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(auth)/signUpClient/page.tsx",
        lineNumber: 23,
        columnNumber: 9
    }, this);
}
_s(SignUpClient, "4DGg7jxG4oJpcJ2JRRb7RNY7+1A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$regester$2f$signupclient_context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSignUpClient"]
    ];
});
_c = SignUpClient;
var _c;
__turbopack_refresh__.register(_c, "SignUpClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(auth)/signUpClient/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_070f08._.js.map