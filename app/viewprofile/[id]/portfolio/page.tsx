"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLoginClient } from "../../../context/regester/login_context";
import { useRouter, useParams } from "next/navigation";
import { useApi } from "../../../context/ApiContext";
import { useToken } from "../../../context/token_context";
import Navbar from "../../../components/Nav/page";
import Footer from "../../../components/Footer/page";

export default function AllPortfolioPage() {
  const { token, saveData } = useLoginClient();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { userData } = useToken();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { baseUrl } = useApi();

  const userRole =
    userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";

  const isOwnProfile =
    userRole === "Worker" && id === String(saveData?.workerId);

  useEffect(() => {
    if (!token || !id) return;

    const fetchPortfolios = async () => {
      try {
        let res;
        if (isOwnProfile) {
          // لو فاتح صفحته الشخصية
          res = await fetch(`${baseUrl}/api/Portfolio`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
        } else {
          // لو بيشوف صفحة عامل تاني
          res = await fetch(`${baseUrl}/api/Profile/workers/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
        }

        if (!res.ok) throw new Error("فشل في جلب البيانات");

        const data = await res.json();

        setPortfolios(isOwnProfile ? data : data.portfolioItems || []);
      } catch (err) {
        console.error("❌ Error fetching portfolio:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [token, id, isOwnProfile]);


  const handleDelete = async (portfolioId: number) => {
    if (!confirm("هل أنت متأكد أنك تريد حذف هذا البورتفوليو؟")) return;

    try {
      const res = await fetch(`${baseUrl}/api/Portfolio/${portfolioId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error("فشل في حذف البورتفوليو");

      setPortfolios((prev) => prev.filter((item) => item.id !== portfolioId));
    } catch (err) {
      console.error("❌ Error deleting portfolio:", err);
    }
  };

  const handleDeleteImage = async (portfolioId: number, imageId: number) => {
  if (!confirm("هل تريد حذف هذه الصورة؟")) return;

  try {
    const res = await fetch(`${baseUrl}/api/Portfolio/${portfolioId}/images/${imageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`فشل في حذف الصورة - رمز الحالة: ${res.status}, الرسالة: ${errorText}`);
    }

    console.log("تم حذف الصورة بنجاح");

    setPortfolios((prev) =>
      prev.map((portfolio) =>
        portfolio.id === portfolioId
          ? {
              ...portfolio,
              imageUrls: portfolio.imageUrls.filter((img) => img.id !== imageId),
            }
          : portfolio
      )
    );
  } catch (err: any) {
    console.error("❌ Error deleting image:", err.message || err);
  }
};


  const handleEdit = (id: number) => {
    router.push(`/edit-portfolio/${id}`);
  };

  const handleAddImages = (id: number) => {
    router.push(`/add-portfolio-images/${id}`);
  };

  if (loading)
  return (
    <div className="flex flex-col justify-center items-center py-20 text-gray-600">
      <i className="fa fa-spinner fa-spin text-3xl mb-3 text-green-600"></i>
      <p className="text-lg font-medium">Uploding Data ...</p>
    </div>
  );


  return (<>
    <Navbar  />
    <div className="p-4 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-700">
        All Portfolios.
      </h1>
      {portfolios.length === 0 ? (
        <p className="text-center text-gray-500">لا يوجد عناصر لعرضها.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {portfolios.map((item) => (
            <div key={item.id} className="border rounded-lg p-2 shadow relative">
              <div className="flex justify-between items-center mb-1">
                <h2 className="font-semibold text-sm text-green-800 truncate">{item.name}</h2>
                {isOwnProfile && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-blue-600 hover:text-blue-800 text-xs"
                      title="تعديل"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                      title="حذف"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600 mb-2 truncate">{item.description}</p>
              <div className="grid grid-cols-2 gap-1 mb-2">
                {item.imageUrls?.map((imgUrl, index) => (
                  <div key={`${item.id}-img-${index}`} className="relative group">
                    <Image
                      src={typeof imgUrl === "string" ? imgUrl : imgUrl.imageUrl}
                      alt="portfolio image"
                      width={100}
                      height={100}
                      className="rounded object-cover w-full h-24"
                    />
                    {isOwnProfile && (
                      <button
                        onClick={() => {
                          handleDeleteImage(item.id, imgUrl.id);
                        }}
                        className="absolute top-1 right-1 bg-white text-red-600 rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                        title="حذف الصورة"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isOwnProfile && (
                <button
                  onClick={() => handleAddImages(item.id)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-xs py-1 rounded text-gray-700"
                >
                  ➕ إضافة صور
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={() => router.back()}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-sm"
        >
          Back
        </button>
      </div>
    </div>
    <Footer />
  </>);
}
