import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/i18n/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InfoRight AI — Civic & Legal Empowerment Platform",
  description:
    "Convert citizen complaints into clear, record-based RTI applications, dispute guidance, and welfare scheme matching with Bharat Language Access.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased text-[#172033]`}>
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 flex flex-col min-w-0">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
