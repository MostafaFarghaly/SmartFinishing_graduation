"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
export default function ConfirmCode() {
const [code, setCode] = useState(new Array(4).fill(""));

const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    // الانتقال إلى الحقل التالي تلقائيًا
    if (element.nextSibling) {
    element.nextSibling.focus();
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    alert("Verification Code: " + code.join(""));
};

return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
            {/* Left Section */}
            <div className="w-10/12 p-8">
                <h2 className="text-2xl font-bold text-green-600 text-center mb-4">Verification Code</h2>
                <p className="text-gray-500 text-center mb-4">
                    Please confirm the security code received on your registered email.
                </p>
                <div className="text-center text-green-500 font-bold mb-4">00:59</div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-center space-x-2 mb-4">
                        {code.map((data, index) => (
                            <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                        ))}
                    </div>
                    <Link href="/resetPass">
                        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                            Confirm
                        </button>
                    </Link>
                </form>
                    <div className="text-center mt-4">
                        <p className="text-gray-500">
                        Did not receive the code?{" "}
                        <button className="text-green-600 font-bold hover:underline">Send Again</button>
                        </p>
                    </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 bg-green-50 flex items-center justify-center p-8">
                <Image
                    src="/images/code.png"
                    alt="Verification"
                    width={400}
                    height={400}
                    className="mx-auto"/>
            </div>
        </div>
    </div>
);
}
