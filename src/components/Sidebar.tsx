"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRole } from "@/context/RoleContext";
import {
  LayoutDashboard,
  MessageSquarePlus,
  Scale,
  Bookmark,
  FileText,
  HelpCircle,
  User,
  Settings,
  FolderOpen,
  ClipboardList,
  AlertOctagon,
  Users
} from "lucide-react";

export default function Sidebar() {
  const { role } = useRole();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "";

  if (role === "public") return null;

  const getCitizenLinks = () => [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, exact: true },
    { name: "Ask InfoRight AI", href: "/ask", icon: MessageSquarePlus },
    { name: "My Consultations", href: "/dashboard?tab=consultations", icon: ClipboardList, queryTab: "consultations" },
    { name: "Know Your Rights", href: "/rights", icon: Scale },
    { name: "Saved Resources", href: "/dashboard?tab=saved-resources", icon: Bookmark, queryTab: "saved-resources" },
    { name: "My Documents", href: "/dashboard?tab=documents", icon: FileText, queryTab: "documents" },
    { name: "Help & Support", href: "/resources", icon: HelpCircle },
    { name: "Citizen Profile", href: "/dashboard?tab=profile", icon: User, queryTab: "profile" }
  ];

  const getOfficialLinks = () => [
    { name: "Official Dashboard", href: "/official", icon: LayoutDashboard, exact: true },
    { name: "Submitted Cases", href: "/official?filter=all", icon: FolderOpen },
    { name: "Urgent Cases", href: "/official?filter=urgent", icon: AlertOctagon },
    { name: "Citizens Directory", href: "/official?tab=citizens", icon: Users, queryTab: "citizens" },
    { name: "Reference Library", href: "/resources", icon: Scale },
    { name: "System Settings", href: "/official?tab=settings", icon: Settings, queryTab: "settings" }
  ];

  const links = role === "official" ? getOfficialLinks() : getCitizenLinks();

  const isLinkActive = (link: typeof links[0]) => {
    // If we're verifying queryTab
    if (link.queryTab) {
      return pathname === link.href.split("?")[0] && activeTab === link.queryTab;
    }
    
    // Exact path match
    if (link.exact) {
      return pathname === link.href && activeTab === "";
    }

    // Pathname starts with href (strip query parameters from href first)
    const baseHref = link.href.split("?")[0];
    if (baseHref === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(baseHref) && activeTab === "";
  };

  return (
    <aside className="w-64 border-r border-borders/80 bg-white hidden md:block min-h-[calc(100vh-4rem)] p-4 no-print shrink-0">
      <div className="flex flex-col gap-1">
        <div className="px-3 mb-4">
          <span className="text-[10.5px] font-bold text-secondary-text tracking-wider uppercase">
            {role === "official" ? "Official Console" : "Citizen Portal"}
          </span>
        </div>
        
        {links.map((link) => {
          const Icon = link.icon;
          const active = isLinkActive(link);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                active
                  ? "text-indigo-primary bg-indigo-primary/5 shadow-2xs"
                  : "text-secondary-text hover:text-dark-text hover:bg-slate-50"
              }`}
            >
              <Icon className={`h-4.5 w-4.5 shrink-0 ${active ? "text-indigo-primary" : "text-secondary-text"}`} />
              <span className="truncate">{link.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-borders px-3">
        <div className="bg-sky-light-bg rounded-lg p-3 border border-sky-blue/20">
          <div className="flex items-start gap-2.5">
            <div className="bg-sky-blue/10 text-indigo-primary p-1.5 rounded-md mt-0.5">
              <Scale className="h-4 w-4 text-indigo-primary" />
            </div>
            <div>
              <span className="text-xs font-bold text-dark-text block">Privacy Shield</span>
              <p className="text-[10px] text-secondary-text leading-relaxed mt-1">
                Your personal details remain on this browser and are not shared with AI services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
