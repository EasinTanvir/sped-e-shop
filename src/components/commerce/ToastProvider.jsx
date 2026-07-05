"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          border: "1px solid #e4e4e7",
          borderRadius: "8px",
          boxShadow: "0 12px 30px rgba(24, 24, 27, 0.12)",
          fontWeight: 700,
        },
        success: {
          iconTheme: {
            primary: "#dc2626",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
