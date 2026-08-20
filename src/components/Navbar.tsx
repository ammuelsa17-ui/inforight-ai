"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRole } from "@/context/RoleContext";
import { Scale, ShieldAlert, User, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const { role, setRole } = useRole();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRoleChange = (newRole: "public" | "citizen" | "official") => {
    setRole(newRole);
    setMobileMenuOpen(false);
    if (newRole === "citizen") {
      router.push("/dashboard");
    } else if (newRole === "official") {
      router.push("/official");
    } else {
      router.push("/");
    }
  };

  // Nav links based on role
  const getNavLinks = () => {
    switch (role) {
      case "citizen":
        return [
          { name: "Dashboard", href: "/dashboard" },
          { name: "Ask AI", href: "/ask" },
          { name: "Know Your Rights", href: "/rights" },
          { name: "Resources", href: "/resources" }
        ];
      case "official":
        return [
          { name: "Official Panel", href: "/official" },
          { name: "Resources", href: "/resources" }
        ];
      case "public":
      default:
        return [
          { name: "Home", href: "/" },
          { name: "Ask AI", href: "/ask" },
          { name: "Know Your Rights", href: "/rights" },
          { name: "Resources", href: "/resources" }
        ];
    }
  };

  const links = getNavLinks();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-borders/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href={role === "public" ? "/" : role === "citizen" ? "/dashboard" : "/official"} className="flex items-center gap-2">
              <div className="bg-indigo-primary text-white p-2 rounded-md flex items-center justify-center shadow-sm">
                <Scale className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-dark-text leading-tight">InfoRight AI</span>
                <span className="text-[10px] text-secondary-text font-medium uppercase tracking-wider">Civic & Legal Platform</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-1 items-center">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-indigo-primary bg-indigo-primary/5"
                      : "text-secondary-text hover:text-dark-text hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Role Selector & Login controls */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center bg-slate-50 border border-borders rounded-lg p-1">
              <span className="text-xs font-semibold px-2 text-secondary-text">Role:</span>
              <button
                onClick={() => handleRoleChange("public")}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                  role === "public"
                    ? "bg-white text-indigo-primary shadow-xs border border-borders"
                    : "text-secondary-text hover:text-dark-text"
                }`}
              >
                Public
              </button>
              <button
                onClick={() => handleRoleChange("citizen")}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                  role === "citizen"
                    ? "bg-white text-indigo-primary shadow-xs border border-borders"
                    : "text-secondary-text hover:text-dark-text"
                }`}
              >
                Citizen
              </button>
              <button
                onClick={() => handleRoleChange("official")}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                  role === "official"
                    ? "bg-white text-indigo-primary shadow-xs border border-borders"
                    : "text-secondary-text hover:text-dark-text"
                }`}
              >
                Official
              </button>
            </div>

            {role === "public" ? (
              <button
                onClick={() => handleRoleChange("citizen")}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-indigo-primary rounded-lg shadow-xs hover:bg-indigo-primary/95 transition-all hover:scale-[1.01] active:scale-[0.99] gap-1.5 cursor-pointer"
              >
                <span>Citizen Login</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => handleRoleChange("public")}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary-text hover:text-dark-text px-3 py-2 border border-borders rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                <User className="h-4 w-4" />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <div className="bg-slate-50 border border-borders rounded-md p-1 flex gap-1">
              <button
                onClick={() => handleRoleChange("public")}
                className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                  role === "public" ? "bg-white text-indigo-primary shadow-xs border border-borders" : "text-secondary-text"
                }`}
              >
                Pub
              </button>
              <button
                onClick={() => handleRoleChange("citizen")}
                className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                  role === "citizen" ? "bg-white text-indigo-primary shadow-xs border border-borders" : "text-secondary-text"
                }`}
              >
                Cit
              </button>
              <button
                onClick={() => handleRoleChange("official")}
                className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                  role === "official" ? "bg-white text-indigo-primary shadow-xs border border-borders" : "text-secondary-text"
                }`}
              >
                Off
              </button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-secondary-text hover:text-dark-text p-2 rounded-md hover:bg-slate-50"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-borders bg-white px-4 py-3 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-semibold transition-colors ${
                    isActive ? "text-indigo-primary bg-indigo-primary/5" : "text-secondary-text hover:text-dark-text hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="pt-3 border-t border-borders flex flex-col gap-2">
            {role === "public" ? (
              <button
                onClick={() => handleRoleChange("citizen")}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-indigo-primary rounded-lg shadow-xs hover:bg-indigo-primary/95 transition-all"
              >
                <span>Citizen Login</span>
              </button>
            ) : (
              <button
                onClick={() => handleRoleChange("public")}
                className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-secondary-text hover:text-dark-text px-4 py-2.5 border border-borders rounded-lg hover:bg-slate-50"
              >
                <User className="h-4 w-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
