"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../token_context";
import { useApi } from "../ApiContext";

const LoginClientContext = createContext();

export function LoginClientProvider({ children }) {
  const { saveUserData } = useToken();
  const [error, setErrors] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [saveData, setSaveData] = useState(null);
  const [token, setToken] = useState(null);
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

  function getUserData(eventInfo) {
    const updated = { ...user, [eventInfo.target.name]: eventInfo.target.value };
    setUser(updated);
  }

  async function sendData() {
    try {
      // التحقق من وجود البريد أولاً
      const emailCheckRes = await fetch(
        `${baseUrl}/api/Account/emailexists?email=${encodeURIComponent(user.email)}`
      );
      const emailExists = await emailCheckRes.json();

      if (!emailExists) {
        setisLoading(false);
        setErrors("there is no account with this email.");
        return;
      }

      // البريد موجود - الآن نحاول تسجيل الدخول
      const { data } = await axios.post(
        `${baseUrl}/api/account/login`,
        user,
        { validateStatus: () => true }
      );

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
        setErrors("the password is incorrect.");
      }
    } catch (error) {
      setisLoading(false);
      setErrors("فشل الاتصال بالخادم.");
    }
  }


  function submitForm(e) {
    e.preventDefault();
    setisLoading(true);
    sendData();
  }

  async function updateProfilePicture(file) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("لم يتم العثور على التوكن، يرجى تسجيل الدخول مجددًا.");

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
        throw new Error(result.message || "فشل رفع الصورة");
      }

      const newUrl = await response.text();
      const oldDataRaw = localStorage.getItem("userData");
      if (!oldDataRaw) throw new Error("بيانات المستخدم غير موجودة");

      const oldData = JSON.parse(oldDataRaw);
      const updatedData = { ...oldData, profilePictureUrl: newUrl };
      localStorage.setItem("userData", JSON.stringify(updatedData));
      setSaveData(updatedData);
      return newUrl;
    } catch (error) {
      console.error("فشل رفع الصورة:", error);
      throw error;
    }
  }

  async function updateAccountInfo(updatedFields) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("لم يتم العثور على التوكن");

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
          result.message = text || "فشل التحديث";
        }
        throw new Error(result.message || "فشل التحديث");
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
        console.warn("فشل في جلب اسم المدينة:", err);
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
      console.error("فشل التحديث:", error);
      throw error;
    }
  }

  async function changePassword({ currentPassword, newPassword, confirmPassword }) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("يجب تسجيل الدخول أولاً");

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
        const errorMessage = result.errors?.[0] || result.message || "فشل تغيير كلمة المرور.";
        throw new Error(errorMessage);
      }

      return result;
    } catch (error) {
      console.error("فشل تغيير كلمة المرور:", error);
      throw error;
    }
  }

  async function deleteAccount() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("لم يتم العثور على التوكن");

    try {
      const response = await fetch(`${baseUrl}/api/Account/deleteAccount`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const result = await response.text();
        throw new Error(result || "فشل حذف الحساب");
      }

      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      window.location.href = "/login";
      return { success: true };
    } catch (error) {
      console.error("Delete account error:", error);
      return { success: false, message: error.message };
    }
  }

  async function deleteProfilePicture() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("لم يتم العثور على التوكن");

    try {
      const response = await fetch(`${baseUrl}/api/Account/delete-profile-picture`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const result = await response.text();
        throw new Error(result || "فشل حذف الصورة");
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
      console.error("فشل حذف الصورة:", error);
      return { success: false, message: error.message };
    }
  }

    async function forgotPassword(email) {
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
        throw new Error(result || "فشل إرسال رابط استعادة كلمة المرور.");
      }

      return { success: true, message: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني." };
    } catch (error) {
      console.error("فشل إرسال رابط إعادة كلمة المرور:", error);
      return { success: false, message: error.message || "حدث خطأ غير متوقع." };
    }
  }

    async function resetPassword({ email, token, newPassword, confirmPassword }) {
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
        throw new Error(data.message || "فشل إعادة تعيين كلمة المرور.");
      }

      return { success: true, message: "تم تغيير كلمة المرور بنجاح." };
    } catch (error) {
      console.error("Reset password error:", error);
      return { success: false, message: error.message };
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
