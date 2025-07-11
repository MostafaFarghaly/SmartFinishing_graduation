"use client";
import { useEffect, useState } from "react";
import PopularSlider from "../../components/PopularSlider";
import { useApi } from "../../context/ApiContext";

export default function PopularServicesPage() {
  const { baseUrl } = useApi();
  const [services, setServices] = useState([]);


  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${baseUrl}/api/categories`
          , {
            next: { revalidate: 60 }, // Cache for 60 seconds
            cache: "force-cache", // Force cache to avoid re-fetching
          }
        );

        if (!res.ok) throw new Error("Failed to fetch services");

        const json = await res.json();
        const mapped = json.data.map((category) => ({
          name: category.name,
          img: category.services[1]?.pictureUrl || "",
          price: "EGP 100",
          comments: category.services[2]?.workers?.length || 0,
        }));

        setServices(mapped);
      } catch (error) {
        console.error("Error fetching services", error);
      }
    }

    fetchServices();
  }, [baseUrl]);

  return <PopularSlider services={services} />;
}
