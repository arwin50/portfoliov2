import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"], // or ["latin", "latin-ext"] if needed
});

export const metadata: Metadata = {
  title: "Arwin Delasan",
  description: "Arwin Delasan's Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} antialiased`}>
        <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
