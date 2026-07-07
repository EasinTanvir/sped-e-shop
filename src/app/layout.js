import { Geist, Geist_Mono } from "next/font/google";
import ToastProvider from "@/components/commerce/ToastProvider";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shopnobd Shop",
  description: "Cash on Delivery pest control product store",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-950">
        <ToastProvider />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
