"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../token_context";
import { useApi } from "../ApiContext";

// أنواع المدن
interface City {
  id: number;
  name: string;
}

// أنواع بيانات المستخدم
interface UserData {
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
}

// نوع السياق
interface SignUpClientContextType {
  error: string | string[];
  cities: City[];
  isLoading: boolean;
  user: UserData;
  getUserData: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  submitForm: (e: React.FormEvent<HTMLFormElement>) => void;
}

// إنشاء السياق بالنوع
const SignUpClientContext = createContext<SignUpClientContextType | undefined>(
  undefined
);

export function SignUpClientProvider({ children }: { children: React.ReactNode }) {
  const { saveUserData } = useToken();
  const { baseUrl } = useApi();

  const [error, setError] = useState<string | string[]>("");

  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    buildingNumber: "",
    cityId: "",
    age: "",
    profilePicture: null,
  });

  // جلب المدن
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/Cities`)
      .then((res) => setCities(res.data))
      .catch((err) => console.error(err));
  }, [baseUrl]);

  // حفظ بيانات المستخدم
  function getUserData(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "profilePicture" && files) {
      setUser((prev) => ({ ...prev, profilePicture: files[0] }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  }

  // إرسال البيانات
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

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/account/register/customer`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          validateStatus: () => true,
        }
      );

      if (data.errors == null) {
        setIsLoading(false);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify(data));
        saveUserData();
        window.location.href = "/";
      } else {
        setIsLoading(false);
        setError(data.errors);
      }
    } catch (err: any) {
      setIsLoading(false);
      setError("Something went wrong. Please try again.");
    }
  }

  // عند الضغط على زر التسجيل
  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    sendData();
  }

  return (
    <SignUpClientContext.Provider
      value={{
        error,
        cities,
        isLoading,
        user,
        getUserData,
        submitForm,
      }}
    >
      {children}
    </SignUpClientContext.Provider>
  );
}

// استخدام السياق
export function useSignUpClient() {
  const context = useContext(SignUpClientContext);
  if (!context) {
    throw new Error("useSignUpClient must be used within a SignUpClientProvider");
  }
  return context;
}
