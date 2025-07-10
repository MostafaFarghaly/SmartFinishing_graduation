(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_585f3b._.js", {

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
"[project]/app/context/regester/signUpWorker_context.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "SignUpIndustrialProvider": (()=>SignUpIndustrialProvider),
    "useSignUpIndustrial": (()=>useSignUpIndustrial)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
"use client";
;
;
;
const SignUpIndustrialContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
function SignUpIndustrialProvider({ children }) {
    _s();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [cities, setCities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [services, setServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedFile, setSelectedFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: '',
        buildingNumber: '',
        cityName: '',
        age: '',
        profilePictureUrl: '',
        serviceName: '',
        description: '',
        minPrice: '',
        maxPrice: '',
        availableDays: []
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SignUpIndustrialProvider.useEffect": ()=>{
            const fetchData = {
                "SignUpIndustrialProvider.useEffect.fetchData": async ()=>{
                    try {
                        const [citiesRes, servicesRes] = await Promise.all([
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/Cities"),
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/categories/services")
                        ]);
                        setCities(citiesRes.data.data || citiesRes.data);
                        setServices(servicesRes.data.data || servicesRes.data);
                    } catch (err) {
                        console.error("Failed to fetch data:", err);
                        setError("Failed to load required data. Please refresh the page.");
                    }
                }
            }["SignUpIndustrialProvider.useEffect.fetchData"];
            fetchData();
        }
    }["SignUpIndustrialProvider.useEffect"], []);
    function getUserData(e) {
        const { name, value } = e.target;
        setUser((prev)=>({
                ...prev,
                [name]: value ?? ''
            }));
    }
    function handleFileChange(e) {
        const file = e.target.files[0];
        setSelectedFile(file);
    }
    function addAvailableDay() {
        setUser((prev)=>({
                ...prev,
                availableDays: [
                    ...prev.availableDays,
                    {
                        day: '',
                        startTime: '',
                        endTime: ''
                    }
                ]
            }));
    }
    function updateAvailableDay(index, field, value) {
        const updated = [
            ...user.availableDays
        ];
        updated[index][field] = value;
        setUser((prev)=>({
                ...prev,
                availableDays: updated
            }));
    }
    function removeAvailableDay(index) {
        const updated = user.availableDays.filter((_, i)=>i !== index);
        setUser((prev)=>({
                ...prev,
                availableDays: updated
            }));
    }
    async function sendData() {
        const formData = new FormData();
        for(const key in user){
            if (key === "availableDays") {
                formData.append("availableDays", JSON.stringify(user.availableDays));
            } else {
                formData.append(key, user[key] ?? '');
            }
        }
        if (selectedFile) {
            formData.append("profilePicture", selectedFile);
        }
        setIsLoading(true);
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/account/register/worker", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                validateStatus: ()=>true
            });
            if (res.data.errors == null) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signIn"])("credentials", {
                    redirect: true,
                    email: user.email,
                    password: user.password,
                    callbackUrl: "/"
                });
            } else {
                setError(res.data.errors);
            }
        } catch (err) {
            setError("Failed to send data. Try again later.");
        } finally{
            setIsLoading(false);
        }
    }
    function submitForm() {
        sendData();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SignUpIndustrialContext.Provider, {
        value: {
            error,
            cities,
            services,
            isLoading,
            user,
            getUserData,
            handleFileChange,
            submitForm,
            addAvailableDay,
            updateAvailableDay,
            removeAvailableDay,
            setUser,
            clearError: ()=>setError(null)
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/regester/signUpWorker_context.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_s(SignUpIndustrialProvider, "I7shFbfYqxq4Z/6jlFtetTtonL8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
_c = SignUpIndustrialProvider;
function useSignUpIndustrial() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SignUpIndustrialContext);
    if (!context) {
        throw new Error("useSignUpIndustrial must be used within a SignUpIndustrialProvider");
    }
    return context;
}
_s1(useSignUpIndustrial, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_refresh__.register(_c, "SignUpIndustrialProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(auth)/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_585f3b._.js.map