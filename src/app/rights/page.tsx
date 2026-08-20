"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { RIGHTS_DATA, RightCategory } from "@/data/rights";
import { Search, Scale, ShoppingBag, Home, Briefcase, UserCheck, GraduationCap, Heart, HelpCircle, Shield, Globe } from "lucide-react";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { useRole } from "@/context/RoleContext";
import { Toast } from "@/components/Feedback";

// Map string keys to Lucide Components
const ICON_MAP = {
  Scale,
  ShoppingBag,
  Home,
  Briefcase,
  UserCheck,
  GraduationCap,
  Heart,
  HelpCircle,
  Shield,
  Globe
};

export default function RightsDirectoryPage() {
  const router = useRouter();
  const { savedRights, toggleSaveRight } = useRole();
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  const handleSaveToggle = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    toggleSaveRight(id);
    const isSaved = savedRights.includes(id);
    setToastMsg(isSaved ? "Right removed from dashboard bookmarks" : "Right bookmarked to your citizen dashboard!");
  };

  const filteredCategories = Object.values(RIGHTS_DATA).filter((category) => {
    const query = searchQuery.toLowerCase();
    return (
      category.title.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query) ||
      category.details.law.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex-1 space-y-6 max-w-6xl mx-auto w-full py-4">
      {toastMsg && <Toast type="success" message={toastMsg} onClose={() => setToastMsg("")} />}

      <div className="border-b border-borders pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-dark-text sm:text-3xl">
          Know Your Rights
        </h1>
        <p className="text-xs sm:text-sm text-secondary-text mt-1">
          Explore legal guarantees, statutory codes, required documentation, and help lines across civic domains.
        </p>
      </div>

      {/* Search Header */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white border border-borders rounded-lg p-4 shadow-2xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-text" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rights, e.g., 'rent control', 'minimum wage', 'equal pay', 'RTI'..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-borders text-sm text-dark-text bg-white transition-colors focus:border-indigo-primary focus:outline-none"
          />
        </div>
        <div className="text-xs text-secondary-text font-semibold shrink-0">
          Showing {filteredCategories.length} Categories
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = ICON_MAP[category.iconName] || Scale;
            const isBookmarked = savedRights.includes(category.id);

            return (
              <div
                key={category.id}
                onClick={() => router.push(`/rights/${category.id}`)}
                className="bg-white border border-borders rounded-lg p-5.5 shadow-2xs hover:border-indigo-primary/40 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4.5">
                    <div className="bg-indigo-primary/5 text-indigo-primary p-2.5 rounded-lg w-fit group-hover:bg-indigo-primary/10 transition-colors">
                      <Icon className="h-5.5 w-5.5 text-indigo-primary" />
                    </div>
                    
                    <button
                      onClick={(e) => handleSaveToggle(e, category.id)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded border cursor-pointer transition-all ${
                        isBookmarked
                          ? "bg-indigo-primary/10 border-indigo-primary/30 text-indigo-primary"
                          : "bg-slate-50 border-borders text-secondary-text hover:text-dark-text hover:bg-slate-100"
                      }`}
                      title={isBookmarked ? "Remove bookmark" : "Bookmark this right"}
                    >
                      {isBookmarked ? "Bookmarked" : "Save"}
                    </button>
                  </div>
                  
                  <h3 className="text-sm font-bold text-dark-text tracking-tight uppercase mb-2">
                    {category.title}
                  </h3>
                  <p className="text-xs text-secondary-text leading-relaxed line-clamp-3">
                    {category.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-50">
                  <span className="text-[10px] text-secondary-text font-semibold uppercase tracking-wider block">
                    Law: {category.details.law.split(";")[0].substring(0, 30)}...
                  </span>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-indigo-primary group-hover:text-indigo-primary/80">
                    <span>Explore</span>
                    <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-12 bg-white border border-borders rounded-lg">
          <p className="text-sm text-secondary-text">No rights categories found matching &quot;{searchQuery}&quot;.</p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs font-bold text-indigo-primary hover:underline cursor-pointer"
          >
            Clear Search Filter
          </button>
        </div>
      )}
    </div>
  );
}
