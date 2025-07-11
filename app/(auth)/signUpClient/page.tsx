"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSignUpClient } from "../../context/regester/signupclient_context";

export default function SignUpClient() {
  const { error, cities, isLoading, user, getUserData, submitForm } = useSignUpClient();

  const [step, setStep] = useState(1);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validateStep = (step: number) => {
    const errors: { [key: string]: string } = {};

    if (step === 1) {
      if (!user.name) errors.name = "Full Name is required";
      if (!user.email) errors.email = "Email is required";
      if (!user.password) errors.password = "Password is required";
      if (!user.confirmPassword) errors.confirmPassword = "Confirmation is required";
      if (user.password !== user.confirmPassword) errors.confirmPassword = "Passwords do not match";
      if (!user.phoneNumber) errors.phoneNumber = "Phone number is required";
    }

    if (step === 2) {
      if (!user.address) errors.address = "Address is required";
      if (!user.buildingNumber) errors.buildingNumber = "Building Number is required";
      if (!user.cityId) errors.cityId = "City is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    const valid = validateStep(step);
    if (valid) {
      setSubmitted(false);
      setFormErrors({});
      setStep((prev) => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      nextStep();
    } else {
      submitForm(e);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl">
        <div className="w-10/12 p-8">
          <div className="mb-6">
            <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
              <span className={step === 1 ? "text-green-600 font-bold" : ""}>Step 1</span>
              <span className={step === 2 ? "text-green-600 font-bold" : ""}>Step 2</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === 1 ? "w-1/2 bg-green-500" : "w-full bg-green-600"
                }`}
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
                <InputField name="name" label="Full Name" value={user.name} onChange={getUserData} error={formErrors.name} showError={submitted} />
                <InputField name="email" label="Email" type="email" value={user.email} onChange={getUserData} error={formErrors.email} showError={submitted} />
                <InputField name="password" label="Password" type="password" value={user.password} onChange={getUserData} error={formErrors.password} showError={submitted} />
                <InputField name="confirmPassword" label="Confirm Password" type="password" value={user.confirmPassword} onChange={getUserData} error={formErrors.confirmPassword} showError={submitted} />
                <InputField name="phoneNumber" label="Phone Number" value={user.phoneNumber} onChange={getUserData} error={formErrors.phoneNumber} showError={submitted} />

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-2">
                <InputField name="address" label="Address" value={user.address} onChange={getUserData} error={formErrors.address} showError={submitted} />
                <InputField name="buildingNumber" label="Building Number" value={user.buildingNumber} onChange={getUserData} error={formErrors.buildingNumber} showError={submitted} />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <select
                    name="cityId"
                    value={user.cityId}
                    onChange={getUserData}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select a city</option>
                    {cities.map((city: any) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {submitted && formErrors.cityId && (
                    <p className="text-sm text-red-600 mt-1">{formErrors.cityId}</p>
                  )}
                </div>

                <InputField name="age" label="Age" type="number" value={user.age} onChange={getUserData} />

                <div>
                  <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
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

function InputField({
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  showError
}: {
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showError?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
          showError && error ? "border-red-500" : ""
        }`}
      />
      {showError && error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
