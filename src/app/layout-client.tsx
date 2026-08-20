"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import { useRole } from "@/context/RoleContext";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function LayoutClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role } = useRole();
  const pathname = usePathname();

  // Determine if sidebar should be visible
  // Hide on landing page "/" and for "public" role
  const showSidebar = role !== "public" && pathname !== "/";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Area */}
      <div className="flex-1 flex bg-slate-50/30">
        <Suspense fallback={<div className="p-4">Loading navigation...</div>}>
          {showSidebar && <Sidebar />}
        </Suspense>

        {/* Content container */}
        <main className={`flex-1 flex flex-col min-w-0 ${showSidebar ? "p-4 sm:p-6 lg:p-8" : ""}`}>
          <div className={`${showSidebar ? "max-w-7xl w-full mx-auto flex-1 flex flex-col" : "flex-1 flex flex-col"}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
