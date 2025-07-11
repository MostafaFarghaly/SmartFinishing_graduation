// app/account/edit/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useLoginClient } from "../context/regester/login_context";
import { useToken } from "../context/token_context";
import { useApi } from "../context/ApiContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useRouter } from "next/navigation";

export default function EditAccountPage() {
  const { updateAccountInfo } = useLoginClient();
  const { userData } = useToken();
  const { baseUrl } = useApi();

  const userRole =
    userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";

  const [fields, setFields] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    buildingNumber: "",
    cityId: "",
    age: 0,
    description: "",
    companyName: "",
    experienceYears: 0,
    serviceId: "",
  });

  const [editField, setEditField] = useState("");
  const [cities, setCities] = useState([]);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const user = JSON.parse(data);
      setFields({
        name: user.displayName || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        buildingNumber: user.buildingNumber || "",
        cityId: user.cityName || "",
        age: user.age || 0,
        description: user.description || "",
        companyName: user.companyName || "",
        experienceYears: user.experienceYears || 0,
        serviceId: user.serviceName || "",
      });
    }

    const fetchData = async () => {
      try {
        const [citiesRes, servicesRes] = await Promise.all([
          axios.get(`${baseUrl}/api/Cities`),
          axios.get(`${baseUrl}/api/categories/services?pageSize=1000`),
        ]);

        const citiesData = citiesRes.data?.data || citiesRes.data || [];
        setCities(Array.isArray(citiesData) ? citiesData : []);

        const servicesRaw = servicesRes.data?.data || servicesRes.data || [];
        const validServices = Array.isArray(servicesRaw)
          ? servicesRaw.filter((service) => service?.id && service?.name)
          : [];
        setServices(validServices);
      } catch (err) {
        console.error("❌ Failed to fetch data:", err);
      }
    };

    fetchData();
  }, []);

  const handleFieldChange = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await updateAccountInfo({
        ...fields,
        cityId: Number(fields.cityId),
        age: Number(fields.age),
        experienceYears: Number(fields.experienceYears),
        serviceId: Number(fields.serviceId),
      });

      setMessage({ type: "success", text: "✅ Profile updated successfully." });
      setIsDirty(false);
      setEditField("");
    } catch (err) {
      setMessage({ type: "error", text: "❌ Update failed: " + err.message });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        router.push("/account");
      }, 1500);
    }
  };

  const renderInput = (label, value, key, type = "text", options = []) => (
    <div className="my-4">
      <label className="block mb-1 text-sm font-medium">{label}</label>
      {type === "select" ? (
        <select
          value={value}
          onChange={(e) => handleFieldChange(key, e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="">{value}</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => handleFieldChange(key, e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      )}
    </div>
  );

  const displayField = (label, value, key) => (
    <div
      className="flex justify-between items-center py-2 border-b cursor-pointer"
      onClick={() => setEditField(editField === key ? "" : key)}
    >
      <span className="font-medium text-sm">{label}</span>
      <span className="text-gray-600 text-sm">{value}</span>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="bg-white w-full rounded-xl shadow-lg p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Main Edit Section */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">My Profile</h2>
              <Link href="/account">
                <button className="text-gray-400 text-2xl hover:text-red-500">&times;</button>
              </Link>
            </div>

            {/* Editable Fields */}
            {[
              ["Profile Name", fields.name, "name"],
              ["Phone Number", fields.phoneNumber, "phoneNumber"],
              ["Age", fields.age, "age"],
              ["City", cities.find((c) => String(c.id) === String(fields.cityId))?.name, "cityId"],
              ["Address", fields.address, "address"],
              ["Building Number", fields.buildingNumber, "buildingNumber"],
              ...(userRole !== "Customer"
                ? [
                    ["Company Name", fields.companyName, "companyName"],
                    ["Experience Years", fields.experienceYears, "experienceYears"],
                    ["Description", fields.description, "description"],
                    ["Service", services.find((s) => String(s.id) === String(fields.serviceId))?.name, "serviceId"],
                  ]
                : []),
            ].map(([label, value, key]) => (
              <React.Fragment key={key}>
                {displayField(label, value, key)}
                {editField === key &&
                  renderInput(
                    label,
                    fields[key],
                    key,
                    key === "age" || key === "experienceYears" ? "number" : key === "cityId" || key === "serviceId" ? "select" : "text",
                    key === "cityId" ? cities : key === "serviceId" ? services : []
                  )}
              </React.Fragment>
            ))}

            {isDirty && (
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded"
              >
                {isLoading ? <i className="fa fa-spinner fa-spin mr-2" /> : null}
                Save All Changes
              </button>
            )}

            {message.text && (
              <div
                className={`mt-4 px-4 py-2 rounded text-sm font-medium ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {message.text}
              </div>
            )}
          </div>

          {/* Info Boxes */}
          <div className="w-full md:max-w-sm flex flex-col gap-4">
            {[
              {
                icon: "lock",
                title: "Why isn't my info shown here?",
                desc: "We're hiding some account details to protect your identity.",
              },
              {
                icon: "lock",
                title: "Which details can be edited?",
                desc: "Some details can't be changed. You may need to verify your identity later.",
              },
              {
                icon: "info-circle",
                title: "What info is shared with others?",
                desc: "We only release contact info after a reservation is confirmed.",
              },
            ].map(({ icon, title, desc }, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow p-4">
                <i className={`fa fa-${icon} text-green-600 text-xl mb-2`} />
                <h4 className="font-semibold text-base">{title}</h4>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
}
