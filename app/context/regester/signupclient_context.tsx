"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../token_context";
import { useApi } from "../ApiContext"; // Assuming you have a token context to manage user data

const SignUpClientContext = createContext();
 // Assuming you have a base URL context

export function SignUpClientProvider({ children }) {
  const { saveUserData } = useToken();
  const { baseUrl } = useApi();
  const [error, setError] = useState("");
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
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

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/Cities`)
      .then((res) => setCities(res.data))
      .catch((err) => console.error(err));
  }, []);

  function getUserData(e) {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setUser((prev) => ({ ...prev, profilePicture: files[0] }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
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
    if (user.age) formData.append("Age", user.age);
    if (user.profilePicture) formData.append("ProfilePicture", user.profilePicture);

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
  }

  function submitForm(e) {
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

export function useSignUpClient() {
  const context = useContext(SignUpClientContext);
  if (!context) {
    throw new Error("useSignUpClient must be used within a SignUpClientProvider");
  }
  return context;
}
