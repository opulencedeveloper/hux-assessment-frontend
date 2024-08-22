import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContextProvider } from "@/store/auth-context";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative antialiased tracking-tight text-gray-500 bg-black`}>
        <AuthContextProvider>
          <ToastContainer position="top-center" />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
