import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const InterFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LMNotes",
  description: "A minimalist note-taking app for focused writing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full hide-scrollbar">
      <body
        className={`${InterFont.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full h-25 flex items-center flex-shrink-0 fixed top-0">
          <Header />
        </div>
        <div className="flex flex-1">
          <div className="fixed top-[100px] bottom-0 bg-[#1e1e1e] flex-shrink-0 w-16 md:w-64">
            <Sidebar />
          </div>

          <main className="flex-1 overflow-y-auto ml-16 md:ml-64 lg:ml-64 pt-[100px]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
