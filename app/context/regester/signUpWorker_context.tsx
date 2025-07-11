"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useToken } from "../token_context";
import { useApi } from "../ApiContext";

type AvailableDay = {
  day: string;
  startTime: string;
  endTime: string;
};

export type WorkerSignUpData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
  buildingNumber: string;
  cityId: string;
  age: string;
  profilePicture: File | null;
  serviceId: string;
  description: string;
  companyName: string;
  experienceYears: string;
  minPrice: string;
  maxPrice: string;
  availableDays: AvailableDay[];
};

type SignUpIndustrialContextType = {
  error: string | string[] | null;
  cities: { id: string; name: string }[];
  services: { id: string; name: string }[];
  isLoading: boolean;
  user: WorkerSignUpData;
  getUserData: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  submitForm: () => void;
  addAvailableDay: () => void;
  updateAvailableDay: (index: number, field: keyof AvailableDay, value: string) => void;
  removeAvailableDay: (index: number) => void;
  setUser: React.Dispatch<React.SetStateAction<WorkerSignUpData>>;
  clearError: () => void;
};

const SignUpIndustrialContext = createContext<SignUpIndustrialContextType | null>(null);

export function SignUpIndustrialProvider({ children }: { children: ReactNode }) {
  const { saveUserData } = useToken();
  const { baseUrl } = useApi();

  const [error, setError] = useState<string | string[] | null>(null);
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [services, setServices] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<WorkerSignUpData>({
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
        const validServices = serviceList.filter((s: any) => s && s.id && s.name);
        setServices(validServices);
      } catch (err) {
        console.error("❌ Failed to fetch data:", err);
        setError("Failed to load required data. Please try again.");
      }
    };

    fetchData();
  }, [baseUrl]);

  function getUserData(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "profilePicture" && files) {
      setUser((prev) => ({ ...prev, profilePicture: files[0] }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value ?? '' }));
    }
  }

  function addAvailableDay() {
    setUser((prev) => ({
      ...prev,
      availableDays: [...prev.availableDays, { day: '', startTime: '', endTime: '' }]
    }));
  }

  function updateAvailableDay(index: number, field: keyof AvailableDay, value: string) {
    const updated = [...user.availableDays];
    updated[index][field] = value;
    setUser((prev) => ({ ...prev, availableDays: updated }));
  }

  function removeAvailableDay(index: number) {
    const updated = user.availableDays.filter((_, i) => i !== index);
    setUser((prev) => ({ ...prev, availableDays: updated }));
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
    formData.append("Age", user.age);
    formData.append("ServiceId", user.serviceId);
    formData.append("Description", user.description);
    formData.append("CompanyName", user.companyName || '');
    formData.append("ExperienceYears", user.experienceYears || '0');
    formData.append("MinPrice", user.minPrice || '0');
    formData.append("MaxPrice", user.maxPrice || '0');
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
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data));
        saveUserData();
        window.location.href = "/";
      } else {
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
