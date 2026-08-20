"use client";

import React, { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  loading?: boolean;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  icon: Icon,
  iconPosition = "left",
  loading = false,
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-primary shadow-xs hover:bg-indigo-primary/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-primary transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-primary gap-2 cursor-pointer ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-1 h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && Icon && iconPosition === "left" && <Icon className="h-4.5 w-4.5 shrink-0" />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === "right" && <Icon className="h-4.5 w-4.5 shrink-0" />}
    </button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  icon: Icon,
  iconPosition = "left",
  loading = false,
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-dark-text bg-white border border-borders hover:bg-slate-50 hover:text-dark-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-primary transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed gap-2 cursor-pointer ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-1 h-4.5 w-4.5 text-indigo-primary" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && Icon && iconPosition === "left" && <Icon className="h-4.5 w-4.5 shrink-0" />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === "right" && <Icon className="h-4.5 w-4.5 shrink-0" />}
    </button>
  );
};

export const IconButton: React.FC<ButtonProps & { title: string }> = ({
  icon: Icon,
  title,
  className = "",
  disabled,
  ...props
}) => {
  if (!Icon) return null;
  return (
    <button
      disabled={disabled}
      title={title}
      aria-label={title}
      className={`p-2 rounded-lg text-secondary-text hover:text-dark-text hover:bg-slate-50 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
      {...props}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
};
