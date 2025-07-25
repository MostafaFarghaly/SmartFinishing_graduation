import { TokenProvider } from "./context/token_context";
import { SignUpClientProvider } from "./context/regester/signupclient_context";
import { LoginClientProvider } from "./context/regester/login_context";
import { SignUpIndustrialProvider } from "./context/regester/signUpWorker_context";
import { ApiProvider } from "./context/ApiContext";
import ScrollToTop from "./scrolltotop/page";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ProtectedRoute from "./components/ProtectedRoute"; 
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Finish",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ApiProvider>
          <TokenProvider>
            <SignUpClientProvider>
              <SignUpIndustrialProvider>
                <LoginClientProvider>
                  <ProtectedRoute>
                    {children}
                  </ProtectedRoute>
                  <ScrollToTop />
                </LoginClientProvider>
              </SignUpIndustrialProvider>
            </SignUpClientProvider>
          </TokenProvider>
        </ApiProvider>
      </body>
    </html>
  );
}