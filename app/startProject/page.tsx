"use client";
import { useEffect, useState } from "react";
import StartProjectForm from "../components/StartProjectForm";
import { useApi } from "../context/ApiContext";

export default function StartProjectPage() {
    const { baseUrl } = useApi();
    const [services, setServices] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        async function getData() {
        const [catRes, cityRes] = await Promise.all([
            fetch(`${baseUrl}/api/categories`),
            fetch(`${baseUrl}/api/cities`),
        ]);

        if (!catRes.ok || !cityRes.ok) {
            console.error("Failed to fetch API data");
            return;
        }

        const catJson = await catRes.json();
        const citiesArray = await cityRes.json();

        const services = (catJson?.data || []).flatMap(category =>
            (category.services || []).map(s => ({
            id: s.id,
            name: s.name,
            }))
        );

        const cities = (citiesArray || []).map(city => city.name);

        setServices(services);
        setCities(cities);
        }

        getData();
    }, [baseUrl]);

    return <StartProjectForm services={services} cities={cities} />;
}
