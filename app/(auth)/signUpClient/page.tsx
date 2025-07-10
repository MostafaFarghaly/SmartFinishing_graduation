"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSignUpClient } from "../../context/regester/signupclient_context";

export default function SignUpClient() {
  const { error, cities, isLoading, user, getUserData, submitForm } = useSignUpClient();
  const [step, setStep] = useState(1);
  const [stepOneError, setStepOneError] = useState("");


  const nextStep = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = user;

    if (!name || !email || !password || !confirmPassword ) {
      setStepOneError("Please fill in all required fields before proceeding.");
      return;
    }

    setStepOneError(""); // إخفاء الرسالة لو البيانات كاملة
    setStep(2);
  };


  const prevStep = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 1) {
      nextStep(e); // تستخدم نفس منطق التحقق
    } else {
      submitForm(e); // إرسال البيانات في الخطوة 2
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl">
        {/* Left Section */}
        <div className="w-10/12 p-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
              <span className={step === 1 ? "text-green-600 font-bold" : ""}>Step 1</span>
              <span className={step === 2 ? "text-green-600 font-bold" : ""}>Step 2</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? "w-1/2 bg-green-500" : "w-full bg-green-600"}`}
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold my-text-green mb-1">Sign Up Client</h2>
          <p className="text-gray-600 mb-1">
            Let’s get you all set up so you can access your personal account
          </p>

          {error && (
            <div className="text-red-600 text-sm space-y-1 mb-3">
              {Array.isArray(error) ? error.map((err, idx) => <p key={idx}>{err}</p>) : <p>{error}</p>}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    name="name"
                    value={user.name}
                    onChange={getUserData}
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={getUserData}
                    placeholder="Email"
                    autoComplete="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={getUserData}
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                    autoComplete="new-password"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={user.confirmPassword}
                    onChange={getUserData}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                    autoComplete="new-password"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={getUserData}
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                    autoComplete="tel"
                  />
                </div>
                  {stepOneError && (
                  <div className="text-red-600 text-sm mb-2">{stepOneError}</div>
                )}
                <button
                  onClick={nextStep}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-2">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    name="address"
                    value={user.address}
                    onChange={getUserData}
                    placeholder="Address"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="buildingNumber" className="block text-sm font-medium text-gray-700 mb-1">Building Number</label>
                  <input
                    name="buildingNumber"
                    value={user.buildingNumber}
                    onChange={getUserData}
                    placeholder="Building Number"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cityId" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <select
                    name="cityId"
                    value={user.cityId}
                    onChange={getUserData}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>{city.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    name="age"
                    type="number"
                    value={user.age}
                    onChange={getUserData}
                    placeholder="Age"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                  <input
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={getUserData}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="flex justify-between gap-2">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/2 bg-gray-300 text-gray-700 py-1 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-green-600 text-white py-1 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Create Account"}
                  </button>
                </div>
              </div>
            )}
          </form>


          <p className="mt-3 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-green-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-50 bg-green-50 flex items-center justify-center p-6">
          <Image src="/images/signup.png" alt="Sign Up" width={550} height={550} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
