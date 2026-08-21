import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { RoleProvider } from "@/context/RoleContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InfoRight AI — Privacy-Conscious Legal Rights & RTI Platform",
  description:
    "Convert municipal road complaints into clear record-based RTI applications with verified official sources and safe fallback protection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased text-[#172033]`}>
        <RoleProvider>
          <Navbar />
          <main className="flex-1 flex flex-col min-w-0">{children}</main>
        </RoleProvider>
      </body>
    </html>
  );
}
