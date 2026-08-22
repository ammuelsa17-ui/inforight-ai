"use client";

import React, { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { ArrowRight, LucideIcon, HelpCircle } from "lucide-react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

// Generic Card
export const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-borders rounded-lg p-5 shadow-2xs ${
        onClick ? "cursor-pointer hover:border-indigo-primary/45 transition-all" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

// StatCard for Dashboards
interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  color?: "indigo" | "sky" | "green" | "amber" | "red";
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  color = "indigo"
}) => {
  const getColorClasses = () => {
    switch (color) {
      case "sky":
        return { bg: "bg-sky-light-bg", icon: "text-indigo-primary", border: "border-sky-blue/20" };
      case "green":
        return { bg: "bg-success-bg", icon: "text-success-green", border: "border-success-green/20" };
      case "amber":
        return { bg: "bg-warning-bg", icon: "text-warning-amber", border: "border-warning-amber/20" };
      case "red":
        return { bg: "bg-danger-bg", icon: "text-danger-red", border: "border-danger-red/20" };
      case "indigo":
      default:
        return { bg: "bg-indigo-primary/5", icon: "text-indigo-primary", border: "border-indigo-primary/20" };
    }
  };

  const style = getColorClasses();

  return (
    <div className={`bg-white border border-borders rounded-lg p-5 shadow-2xs flex items-center justify-between ${style.border}`}>
      <div className="space-y-1">
        <span className="text-[11px] font-bold text-secondary-text uppercase tracking-wider block">{title}</span>
        <span className="text-2xl font-bold text-dark-text tracking-tight block">{value}</span>
        {description && <span className="text-xs text-secondary-text block">{description}</span>}
      </div>
      {Icon && (
        <div className={`p-3 rounded-lg ${style.bg}`}>
          <Icon className={`h-6 w-6 ${style.icon}`} />
        </div>
      )}
    </div>
  );
};

// RightsCard for rights directories
interface RightsCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  exploreUrl: string;
}

export const RightsCard: React.FC<RightsCardProps> = ({
  title,
  description,
  icon: Icon,
  exploreUrl
}) => {
  const { t } = useLanguage();
  return (
    <div className="bg-white border border-borders rounded-lg p-5 shadow-2xs hover:border-indigo-primary/30 transition-all flex flex-col justify-between group">
      <div>
        <div className="bg-indigo-primary/5 text-indigo-primary p-2.5 rounded-lg w-fit mb-4 group-hover:bg-indigo-primary/10 transition-colors">
          <Icon className="h-6 w-6 text-indigo-primary" />
        </div>
        <h3 className="text-base font-bold text-dark-text tracking-tight mb-2">{title}</h3>
        <p className="text-sm text-secondary-text leading-relaxed line-clamp-3 mb-4">{description}</p>
      </div>
      <Link
        href={exploreUrl}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-primary hover:text-indigo-primary/80 transition-colors mt-2"
      >
        <span>{t("common.learnMore")}</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
};

// AIResponseCard for structured response layout
interface AIResponseCardProps {
  title: string;
  children: ReactNode;
  variant?: "indigo" | "sky" | "green" | "amber" | "red";
  icon?: LucideIcon;
}

export const AIResponseCard: React.FC<AIResponseCardProps> = ({
  title,
  children,
  variant = "sky",
  icon: Icon
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "indigo":
        return {
          border: "border-indigo-primary/30",
          headerBg: "bg-indigo-primary/5",
          headerText: "text-indigo-primary",
          iconBg: "bg-indigo-primary/10",
          iconColor: "text-indigo-primary"
        };
      case "green":
        return {
          border: "border-success-green/20",
          headerBg: "bg-success-bg",
          headerText: "text-success-green",
          iconBg: "bg-success-green/10",
          iconColor: "text-success-green"
        };
      case "amber":
        return {
          border: "border-warning-amber/20",
          headerBg: "bg-warning-bg",
          headerText: "text-warning-amber",
          iconBg: "bg-warning-amber/10",
          iconColor: "text-warning-amber"
        };
      case "red":
        return {
          border: "border-danger-red/20",
          headerBg: "bg-danger-bg",
          headerText: "text-danger-red",
          iconBg: "bg-danger-red/10",
          iconColor: "text-danger-red"
        };
      case "sky":
      default:
        return {
          border: "border-sky-blue/20",
          headerBg: "bg-sky-light-bg",
          headerText: "text-dark-text",
          iconBg: "bg-sky-blue/10",
          iconColor: "text-indigo-primary"
        };
    }
  };

  const style = getVariantStyles();

  return (
    <div className={`bg-white border rounded-lg overflow-hidden shadow-2xs ${style.border}`}>
      <div className={`px-4.5 py-3.5 border-b border-inherit flex items-center gap-3 ${style.headerBg}`}>
        {Icon ? (
          <div className={`p-1.5 rounded ${style.iconBg}`}>
            <Icon className={`h-4.5 w-4.5 ${style.iconColor}`} />
          </div>
        ) : (
          <div className={`p-1.5 rounded ${style.iconBg}`}>
            <HelpCircle className={`h-4.5 w-4.5 ${style.iconColor}`} />
          </div>
        )}
        <h4 className={`text-sm font-bold tracking-wide uppercase ${style.headerText}`}>{title}</h4>
      </div>
      <div className="p-5 text-sm text-dark-text leading-relaxed bg-white">
        {children}
      </div>
    </div>
  );
};
