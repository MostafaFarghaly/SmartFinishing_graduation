"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useToken } from "../context/token_context";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { userData, saveUserData } = useToken();
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  const publicRoutes = [
    "/",
    "/changepassword",
    "/confirmcode",
    "/forgetPass",
    "/login",
    "/reset-password",
    "/signup",
    "/signUpClient",
    "/signUpIndustrial",
    "/not-found",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (publicRoutes.includes(pathname)) {
      setChecking(false);
      return;
    }

    if (!userData && token) {
      saveUserData(); // decode token
      setChecking(false);
    } else if (!userData && !token) {
      router.push("/login");
    } else {
      setChecking(false);
    }
  }, [pathname]);

  if (checking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 border-solid"></div>
      </div>
    );
  }

  return <>{children}</>;
}
