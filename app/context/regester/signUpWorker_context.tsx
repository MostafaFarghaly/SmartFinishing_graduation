"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../token_context";
import { useApi } from "../ApiContext";

const SignUpIndustrialContext = createContext();

export function SignUpIndustrialProvider({ children }) {
  const { saveUserData } = useToken();
  const { baseUrl } = useApi();

  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    buildingNumber: '',
    cityId: '',
    age: '',
    profilePicture: null,
    serviceId: '',
    description: '',
    companyName: '',
    experienceYears: '',
    minPrice: '',
    maxPrice: '',
    availableDays: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesRes, servicesRes] = await Promise.all([
          axios.get(`${baseUrl}/api/Cities`),
          axios.get(`${baseUrl}/api/categories/services?pageSize=1000`),
        ]);

        setCities(citiesRes.data.data || citiesRes.data);
        const serviceList = servicesRes.data.data || [];
        const validServices = serviceList.filter(s => s && s.id && s.name);
        setServices(validServices);
      } catch (err) {
        console.error("❌ Failed to fetch data:", err);
        setError("Failed to load required data. Please try again.");
      }
    };

    fetchData();
  }, []);

  function getUserData(e) {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setUser(prev => ({ ...prev, profilePicture: files[0] }));
    } else {
      setUser(prev => ({ ...prev, [name]: value ?? '' }));
    }
  }

  function addAvailableDay() {
    setUser(prev => ({
      ...prev,
      availableDays: [...prev.availableDays, { day: '', startTime: '', endTime: '' }]
    }));
  }

  function updateAvailableDay(index, field, value) {
    const updated = [...user.availableDays];
    updated[index][field] = value;
    setUser(prev => ({ ...prev, availableDays: updated }));
  }

  function removeAvailableDay(index) {
    const updated = user.availableDays.filter((_, i) => i !== index);
    setUser(prev => ({ ...prev, availableDays: updated }));
  }

  async function sendData() {
    const formData = new FormData();

    // Append fields required by API
    formData.append("Name", user.name);
    formData.append("Email", user.email);
    formData.append("Password", user.password);
    formData.append("ConfirmPassword", user.confirmPassword);
    formData.append("PhoneNumber", user.phoneNumber);
    formData.append("Address", user.address);
    formData.append("BuildingNumber", user.buildingNumber);
    formData.append("CityId", user.cityId);
    formData.append("Age", user.age);
    formData.append("ServiceId", user.serviceId);
    formData.append("Description", user.description);
    formData.append("CompanyName", user.companyName || '');
    formData.append("ExperienceYears", user.experienceYears || 0);
    formData.append("MinPrice", user.minPrice || 0);
    formData.append("MaxPrice", user.maxPrice || 0);
    formData.append("AvailableDays", JSON.stringify(user.availableDays));
    if (user.profilePicture) {
      formData.append("ProfilePicture", user.profilePicture);
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${baseUrl}/api/account/register/worker`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          validateStatus: () => true
        }
      );

      if (!res.data.errors) {
        // Success
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data));
        saveUserData();
        window.location.href = "/";
      } else {
        // Server returned validation errors (array of strings)
        setError(res.data.errors);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  function submitForm() {
    sendData();
  }

  return (
    <SignUpIndustrialContext.Provider
      value={{
        error,
        cities,
        services,
        isLoading,
        user,
        getUserData,
        submitForm,
        addAvailableDay,
        updateAvailableDay,
        removeAvailableDay,
        setUser,
        clearError: () => setError(null)
      }}
    >
      {children}
    </SignUpIndustrialContext.Provider>
  );
}

export function useSignUpIndustrial() {
  const context = useContext(SignUpIndustrialContext);
  if (!context) {
    throw new Error("useSignUpIndustrial must be used within a SignUpIndustrialProvider");
  }
  return context;
}
