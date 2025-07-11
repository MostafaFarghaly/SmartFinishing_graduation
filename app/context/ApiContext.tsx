"use client";
import React, { createContext, useContext, ReactNode } from "react";

// 1. عرف نوع القيمة اللي هتتحط في السياق
type ApiContextType = {
  baseUrl: string;
};

// 2. حدد النوع عند إنشاء الـ context
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// 3. عرف نوع البروبز اللي بياخدها الـ Provider
type ApiProviderProps = {
  children: ReactNode;
};

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const baseUrl = "https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net";

  return (
    <ApiContext.Provider value={{ baseUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

// 4. هوك للوصول للـ context مع تحقّق من الاستخدام داخل Provider
export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
