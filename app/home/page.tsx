"use client";
import Image from 'next/image';
import { Search } from "lucide-react";
import { useState } from "react";
import { useToken } from "../context/token_context";

export default function Home() {
    const { userData } = useToken();
    const [search, setSearch] = useState("");

    // استخرج الدور أو اجعل القيمة Customer بشكل افتراضي إذا المستخدم غير مسجل
    const role =
        userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "Customer";

    return (
        role === "Customer" ? (
        // ✅ تصميم العملاء
        <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between px-10 py-16">
            <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold">
                Transform <span className="text-green-400">Your Home</span> With Our <br />
                <span className="text-green-400">Professional Finishing</span> services
                </h1>
                <p className="text-gray-300">
                We help families transform their homes with professional finishing and maintenance services.
                </p>
                <div className="flex gap-4">
                <button className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600 transition">join us</button>
                <button className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">Transform Your house now</button>
                </div>
                <div className="flex mt-6">
                <input
                    type="text"
                    placeholder="Hire a professional now"
                    className="w-full px-4 py-3 rounded-l-lg text-black"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="px-6 py-3 bg-green-500 rounded-r-lg hover:bg-green-600 transition">
                    <Search className="text-white" size={28} />
                </button>
                </div>
            </div>

            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-end">
                <div className="rounded-2xl overflow-hidden shadow-2xl w-[420px] h-[280px]">
                <Image
                    src="/images/Root.png"
                    alt="Modern House"
                    width={420}
                    height={280}
                    className="object-cover w-full h-full"
                />
                </div>
            </div>
            </div>
            <div className="flex flex-col items-center mt-10">
            <p className="mb-4 text-lg">What service are you looking for?</p>
            </div>
        </div>
        ) : (
        // ✅ تصميم المحترفين
        <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white p-8 md:h-[90vh]">
            <div className="w-full md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold">
                Grow <span className="text-green-500">Your Career</span> With Our <br />
                Finishing Services Platform
                </h1>
                <p className="text-gray-300 max-w-md">
                We help professionals grow their careers by connecting them with clients
                who need finishing and maintenance services.
                </p>

                <div className="flex gap-4">
                <button className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold">
                    join us pro
                </button>
                <button className="bg-white text-black px-6 py-2 rounded-md font-semibold">
                    find job
                </button>
                </div>

                <div className="flex mt-4">
                <input
                    type="text"
                    placeholder="Find the perfect job you need"
                    className="p-3 rounded-l-md w-full text-black"
                />
                <button className="bg-green-500 text-white px-6 rounded-r-md">
                    Search
                </button>
                </div>
            </div>

            {/* ✅ صورة موحدة مثل العملاء */}
            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-end">
                <div className="rounded-2xl overflow-hidden shadow-2xl w-[420px] h-[280px]">
                <Image
                    src="/images/Root.png"
                    alt="Modern House"
                    width={420}
                    height={280}
                    className="object-cover w-full h-full"
                />
                </div>
            </div>

            {/* ✅ معلومات إضافية */}
            <div className="absolute bottom-[0px] left-0 right-0 flex justify-between px-4 md:px-8 text-white w-full text-center">
                <div>
                <p className="font-bold text-xl">Specify</p>
                <p className="text-sm text-gray-300">Your own schedule</p>
                </div>
                <div>
                <p className="font-bold text-xl">Humidity</p>
                <p className="text-sm text-gray-300">Your online presence</p>
                </div>
                <div>
                <p className="font-bold text-xl">save</p>
                <p className="text-sm text-gray-300">On marketing</p>
                </div>
            </div>
        </section>

        )
    );
}
