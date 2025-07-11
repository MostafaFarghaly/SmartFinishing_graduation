"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useToken } from "../token_context";
import { useApi } from "../ApiContext";

type LoginClientContextType = {
  error: string;
  isLoading: boolean;
  getUserData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitForm: (e: React.FormEvent<HTMLFormElement>) => void;
  saveData: any;
  token: string | null;
  updateProfilePicture: (file: File) => Promise<string>;
  updateAccountInfo: (updatedFields: any) => Promise<any>;
  changePassword: (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => Promise<any>;
  deleteAccount: () => Promise<{ success: boolean; message?: string }>;
  deleteProfilePicture: () => Promise<{ success: boolean; message?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (data: {
    email: string;
    token: string;
    newPassword: string;
    confirmPassword: string;
  }) => Promise<{ success: boolean; message: string }>;
};

const LoginClientContext = createContext<LoginClientContextType | null>(null);

export function LoginClientProvider({ children }: { children: ReactNode }) {
  const { saveUserData } = useToken();
  const [error, setErrors] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [saveData, setSaveData] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const { baseUrl } = useApi();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const storedToken = localStorage.getItem("token");
    if (storedUserData) setSaveData(JSON.parse(storedUserData));
    if (storedToken) setToken(storedToken);
  }, []);

  function getUserData(eventInfo: React.ChangeEvent<HTMLInputElement>) {
    const updated = { ...user, [eventInfo.target.name]: eventInfo.target.value };
    setUser(updated);
  }

  async function sendData() {
    try {
      const emailCheckRes = await fetch(
        `${baseUrl}/api/Account/emailexists?email=${encodeURIComponent(user.email)}`
      );
      const emailExists = await emailCheckRes.json();

      if (!emailExists) {
        setisLoading(false);
        setErrors("There is no account with this email.");
        return;
      }

      const { data } = await axios.post(`${baseUrl}/api/account/login`, user, {
        validateStatus: () => true,
      });

      if (data.token) {
        setisLoading(false);
        localStorage.setItem("token", data.token);
        setSaveData(data);
        localStorage.setItem("userData", JSON.stringify(data));
        setToken(data.token);
        saveUserData();
        window.location.href = "/";
      } else {
        setisLoading(false);
        setErrors("The password is incorrect.");
      }
    } catch (error) {
      setisLoading(false);
      setErrors("Server connection failed.");
    }
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setisLoading(true);
    sendData();
  }

  async function updateProfilePicture(file: File) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found. Please log in again.");

    try {
      const formData = new FormData();
      formData.append("newProfilePicture", file);

      const response = await fetch(`${baseUrl}/api/Account/update-profile-picture`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to upload profile picture");
      }

      const newUrl = await response.text();
      const oldDataRaw = localStorage.getItem("userData");
      if (!oldDataRaw) throw new Error("User data not found");

      const oldData = JSON.parse(oldDataRaw);
      const updatedData = { ...oldData, profilePictureUrl: newUrl };
      localStorage.setItem("userData", JSON.stringify(updatedData));
      setSaveData(updatedData);
      return newUrl;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  }

  async function updateAccountInfo(updatedFields: any) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");

    try {
      const response = await fetch(`${baseUrl}/api/Account/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        const text = await response.text();
        let result = {};
        try {
          result = JSON.parse(text);
        } catch {
          result = { message: text || "Update failed" };
        }
        throw new Error((result as any).message || "Update failed");
      }

      let cityName = "";
      try {
        const cityRes = await fetch(`${baseUrl}/api/Cities`);
        const cityList = await cityRes.json();
        const foundCity = Array.isArray(cityList)
          ? cityList.find((c) => c.id === updatedFields.cityId)
          : null;

        cityName = foundCity?.name || "";
      } catch (err) {
        console.warn("Failed to fetch city name:", err);
      }

      const oldDataRaw = localStorage.getItem("userData");
      const oldData = oldDataRaw ? JSON.parse(oldDataRaw) : {};

      const updatedUserData = {
        ...oldData,
        displayName: updatedFields.name || oldData.displayName,
        phoneNumber: updatedFields.phoneNumber || oldData.phoneNumber,
        address: updatedFields.address || oldData.address,
        buildingNumber: updatedFields.buildingNumber || oldData.buildingNumber,
        cityId: updatedFields.cityId || oldData.cityId,
        cityName: cityName || oldData.cityName,
        age: updatedFields.age || oldData.age,
        description: updatedFields.description || oldData.description,
        companyName: updatedFields.companyName || oldData.companyName,
        experienceYears: updatedFields.experienceYears || oldData.experienceYears,
        serviceId: updatedFields.serviceId || oldData.serviceId,
      };

      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      setSaveData(updatedUserData);
      return updatedUserData;
    } catch (error) {
      console.error("Update failed:", error);
      throw error;
    }
  }

  async function changePassword({
    currentPassword,
    newPassword,
    confirmPassword,
  }: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("You must be logged in.");

    try {
      const response = await fetch(`${baseUrl}/api/Account/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const result = await response.json();

      if (!response.ok || result.errors) {
        const errorMessage = result.errors?.[0] || result.message || "Failed to change password.";
        throw new Error(errorMessage);
      }

      return result;
    } catch (error) {
      console.error("Change password failed:", error);
      throw error;
    }
  }

  async function deleteAccount() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");

    try {
      const response = await fetch(`${baseUrl}/api/Account/deleteAccount`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const result = await response.text();
        throw new Error(result || "Account deletion failed");
      }

      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      window.location.href = "/login";
      return { success: true };
    } catch (error) {
      console.error("Delete account error:", error);
      return { success: false, message: (error as Error).message };
    }
  }

  async function deleteProfilePicture() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");

    try {
      const response = await fetch(`${baseUrl}/api/Account/delete-profile-picture`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const result = await response.text();
        throw new Error(result || "Failed to delete profile picture");
      }

      const oldDataRaw = localStorage.getItem("userData");
      if (oldDataRaw) {
        const oldData = JSON.parse(oldDataRaw);
        const updatedData = { ...oldData, profilePictureUrl: null };
        localStorage.setItem("userData", JSON.stringify(updatedData));
        setSaveData(updatedData);
      }

      return { success: true };
    } catch (error) {
      console.error("Delete profile picture failed:", error);
      return { success: false, message: (error as Error).message };
    }
  }

  async function forgotPassword(email: string) {
    try {
      const response = await fetch(`${baseUrl}/api/Account/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const result = await response.text();
        throw new Error(result || "Failed to send password reset link.");
      }

      return { success: true, message: "Password reset link sent to your email." };
    } catch (error) {
      console.error("Forgot password error:", error);
      return { success: false, message: (error as Error).message || "Unexpected error occurred." };
    }
  }

  async function resetPassword({
    email,
    token,
    newPassword,
    confirmPassword,
  }: {
    email: string;
    token: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    try {
      const response = await fetch(`${baseUrl}/api/Account/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token, newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed.");
      }

      return { success: true, message: "Password changed successfully." };
    } catch (error) {
      console.error("Reset password error:", error);
      return { success: false, message: (error as Error).message };
    }
  }

  return (
    <LoginClientContext.Provider
      value={{
        error,
        isLoading,
        getUserData,
        submitForm,
        saveData,
        token,
        updateProfilePicture,
        updateAccountInfo,
        changePassword,
        deleteAccount,
        deleteProfilePicture,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </LoginClientContext.Provider>
  );
}

export function useLoginClient() {
  const context = useContext(LoginClientContext);
  if (!context) {
    throw new Error("useLoginClient must be used within a LoginClientProvider");
  }
  return context;
}
