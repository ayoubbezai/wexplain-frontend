"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                fontFamily: "var(--font-manrope)",
                fontSize: "0.875rem",
                fontWeight: 500,
                background: "#ffffff",
                color: "#111827",
                borderRadius: "0.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                padding: "0.5rem 1rem",
                maxWidth: "320px",
              },
              success: {
                style: {
                  borderLeft: "4px solid #16a34a",
                },
                iconTheme: {
                  primary: "#16a34a", // icon background
                  secondary: "#ffffff", // icon color
                },
              },
              error: {
                style: {
                  borderLeft: "4px solid #dc2626",
                },
                iconTheme: {
                  primary: "#dc2626",
                  secondary: "#ffffff",
                },
              },
              loading: {
                style: {
                  borderLeft: "4px solid #2563eb",
                },
                iconTheme: {
                  primary: "#2563eb",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
