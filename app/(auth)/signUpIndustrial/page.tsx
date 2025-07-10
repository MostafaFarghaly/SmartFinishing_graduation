"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from 'next/image';
import Link from "next/link";
import React, { useState } from 'react';
import { useSignUpIndustrial } from "../../context/regester/signUpWorker_context";

export default function SignUpIndustrial() {
  const {
    error,
    cities,
    services,
    isLoading,
    user,
    getUserData,
    submitForm
  } = useSignUpIndustrial();

  const [step, setStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateStep = (step) => {
    const errors = {};

    if (step === 1) {
      if (!user.name) errors.name = 'Full Name is required.';
      if (!user.email) errors.email = 'Email is required.';
      else if (!/^\S+@\S+\.\S+$/.test(user.email)) errors.email = 'Invalid email format.';
      if (!user.password) errors.password = 'Password is required.';
      else if (user.password.length < 6) errors.password = 'Password must be at least 6 characters.';
      if (!user.confirmPassword) errors.confirmPassword = 'Please confirm your password.';
      else if (user.password !== user.confirmPassword) errors.confirmPassword = 'Passwords do not match.';
    }

    if (step === 2) {
      if (!user.phoneNumber) errors.phoneNumber = 'Phone Number is required.';
      if (!user.address) errors.address = 'Address is required.';
      if (!user.buildingNumber) errors.buildingNumber = 'Building Number is required.';
      if (!user.cityId) errors.cityId = 'City is required.';
      if (!user.age) errors.age = 'Age is required.';
    }

    if (step === 3) {
      if (!user.serviceId) errors.serviceId = 'Service is required.';
      if (!user.description) errors.description = 'Description is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    const valid = validateStep(step);
    if (valid) {
      setSubmitted(false);
      setFormErrors({});
      setStep(prev => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const prevStep = () => {
    setSubmitted(false);
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const valid = validateStep(3);
    if (valid) {
      setFormErrors({});
      submitForm(e);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="w-10/12 px-8 py-2">
          <h2 className="text-3xl font-bold text-green-700 mb-2">Sign Up as Industrial</h2>
          <p className="text-gray-600 mb-4">Complete your profile to create your account</p>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className={`text-sm ${step >= 1 ? 'text-green-600 font-medium' : 'text-gray-500'}`}>Personal Info</span>
              <span className={`text-sm ${step >= 2 ? 'text-green-600 font-medium' : 'text-gray-500'}`}>Contact Info</span>
              <span className={`text-sm ${step >= 3 ? 'text-green-600 font-medium' : 'text-gray-500'}`}>Company Info</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {Array.isArray(error) ? error.map((msg, i) => (
                <p key={i}>{msg}</p>
              )) : error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <TextField id="name" label="Full Name" error={formErrors.name} showError={submitted} value={user.name} onChange={getUserData} />
                <TextField id="email" label="Email Address" error={formErrors.email} showError={submitted} value={user.email} onChange={getUserData} />
                <TextField id="password" label="Password" type="password" error={formErrors.password} showError={submitted} value={user.password} onChange={getUserData} />
                <TextField id="confirmPassword" label="Confirm Password" type="password" error={formErrors.confirmPassword} showError={submitted} value={user.confirmPassword} onChange={getUserData} />
              </>
            )}

            {step === 2 && (
              <>
                <TextField id="phoneNumber" label="Phone Number" error={formErrors.phoneNumber} showError={submitted} value={user.phoneNumber} onChange={getUserData} />
                <TextField id="address" label="Address" error={formErrors.address} showError={submitted} value={user.address} onChange={getUserData} />
                <TextField id="buildingNumber" label="Building Number" error={formErrors.buildingNumber} showError={submitted} value={user.buildingNumber} onChange={getUserData} />
                <SelectField id="cityId" label="Select City" error={formErrors.cityId} showError={submitted} options={cities} value={user.cityId} onChange={getUserData} />
                <TextField id="age" label="Your Age" type="number" error={formErrors.age} showError={submitted} value={user.age} onChange={getUserData} />
              </>
            )}

            {step === 3 && (
              <>
                <SelectField id="serviceId" label="Service Type" error={formErrors.serviceId} showError={submitted} options={services} value={user.serviceId} onChange={getUserData} />
                <TextAreaField id="description" label="Description" error={formErrors.description} showError={submitted} value={user.description} onChange={getUserData} />
                <TextField id="experienceYears" label="Experience Years" type="number" value={user.experienceYears} onChange={getUserData} />
                <TextField id="companyName" label="Company Name" value={user.companyName} onChange={getUserData} />
                <TextField id="minPrice" label="Min Price" type="number" value={user.minPrice} onChange={getUserData} />
                <TextField id="maxPrice" label="Max Price" type="number" value={user.maxPrice} onChange={getUserData} />

                <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <input
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={getUserData}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </>
            )}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <button type="button" onClick={prevStep} className="px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">Back</button>
              )}
              {step < 3 ? (
                <button type="button" onClick={nextStep} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Next</button>
              ) : (
                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  {isLoading ? <i className="fa fa-spinner fa-spin"></i> : 'Create Account'}
                </button>
              )}
            </div>
          </form>

          {step === 1 && (
            <>
              <div className="mt-3 flex items-center justify-between">
                <hr className="w-1/4 border-gray-300" />
                <span className="text-sm text-gray-500">or</span>
                <hr className="w-1/4 border-gray-300" />
              </div>
              <p className="mt-6 text-sm text-center text-gray-500">
                Already have an account? <Link href="/login" className="text-green-500 hover:underline">Sign in</Link>
              </p>
            </>
          )}
        </div>
        <div className="w-1/2 bg-green-50 flex items-center justify-center">
          <Image src="/images/signup.png" alt="Sign Up" width={550} height={550} className="mx-auto" priority />
        </div>
      </div>
    </div>
  );
}

function TextField({ id, label, type = "text", error, showError, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value || ''}
        onChange={onChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className={`mt-1 w-full px-4 py-2 border ${showError && error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none`}
      />
      {showError && error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function SelectField({ id, label, error, showError, options, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        id={id}
        name={id}
        value={value || ''}
        onChange={onChange}
        className={`mt-1 w-full px-4 py-2 border ${showError && error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none`}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((item) => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </select>
      {showError && error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function TextAreaField({ id, label, error, showError, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        id={id}
        name={id}
        value={value || ''}
        onChange={onChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className={`mt-1 w-full px-4 py-2 border ${showError && error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none`}
      ></textarea>
      {showError && error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
