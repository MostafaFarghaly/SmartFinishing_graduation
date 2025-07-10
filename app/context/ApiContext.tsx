"use client";
import React, { createContext, useContext } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const baseUrl = "https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net";

    return (
        <ApiContext.Provider value={{ baseUrl }}>
        {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);
