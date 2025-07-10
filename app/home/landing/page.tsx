"use client";
import Image from "next/image";
import { useToken } from "../../context/token_context";

const customerFeatures = [
  {
    id: 1,
    title: "Get high quality services",
    description:
      "To make our sector more confidence, you can check the quality of the service provider's works by reading real reviews from customers who have previously worked with them.",
    image: "/images/quality.png",
    align: "right",
  },
  {
    id: 2,
    title: "Save your time",
    description:
      "Don't waste your time checking references from family and friends. Get personalized offers that increase your work comfort, and have your time spared with a better service.",
    image: "/images/time.png",
    align: "left",
  },
  {
    id: 3,
    title: "Be confident",
    description:
      "You can trust our team to give you the support and peace of mind.",
    image: "/images/safe.png",
    align: "right",
  },
];

const workerFeatures = [
  {
    id: 1,
    title: "Get thousands of customers without marketing spending",
    image: "/images/feature1.png",
  },
  {
    id: 2,
    title: "Choose your jobs, set your appointments",
    image: "/images/feature2.png",
  },
  {
    id: 3,
    title:
      "Build your professional online presence with an online presence expert.",
    image: "/images/feature3.png",
  },
];

export default function Landing() {
  const { userData } = useToken();

  const role =
    userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "Customer";

  // ✅ تصميم العميل
  if (role === "Customer") {
    return (
      <section className="grid grid-cols-1 gap-10 p-10 bg-white">
        {customerFeatures.map((feature) => (
          <div
            key={feature.id}
            className={`flex flex-col md:flex-row gap-5 items-center ${
              feature.align === "left" ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="relative w-full md:w-1/2 flex justify-center">
              <Image
                src={feature.image}
                alt={feature.title}
                width={500}
                height={500}
                className="object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          </div>
        ))}
      </section>
    );
  }

  // ✅ تصميم الصنايعي
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 px-4 bg-white">
      {workerFeatures.map((feature) => (
        <div key={feature.id} className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <Image
              src={feature.image}
              alt={feature.title}
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
          <p className="text-gray-700 font-medium">{feature.title}</p>
        </div>
      ))}
    </section>
  );
}
