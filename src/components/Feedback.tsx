"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Loader2, Inbox, AlertOctagon, CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

// StatusBadge
interface StatusBadgeProps {
  status: "Pending" | "In Progress" | "Resolved" | "Low" | "Medium" | "High" | "Urgent" | "Verified" | "Unverified" | "GENERATED" | "SAVED" | "READY TO FILE" | "AWAITING RESPONSE" | "FIRST APPEAL AVAILABLE";
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
  const getStatusClasses = () => {
    switch (status) {
      case "Pending":
      case "AWAITING RESPONSE":
        return "bg-warning-bg text-warning-amber border-warning-amber/20";
      case "In Progress":
      case "READY TO FILE":
        return "bg-indigo-primary/10 text-indigo-primary border-indigo-primary/20";
      case "GENERATED":
      case "SAVED":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "FIRST APPEAL AVAILABLE":
        return "bg-purple-50 text-purple-700 border-purple-200 animate-pulse";
      case "Resolved":
      case "Verified":
        return "bg-success-bg text-success-green border-success-green/20";
      case "Urgent":
      case "High":
        return "bg-danger-bg text-danger-red border-danger-red/20";
      case "Medium":
        return "bg-orange-50 text-orange-600 border-orange-200";
      case "Low":
        return "bg-slate-50 text-secondary-text border-borders";
      case "Unverified":
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border uppercase tracking-wider ${getStatusClasses()} ${className}`}
    >
      {status}
    </span>
  );
};

// AlertBanner
interface AlertBannerProps {
  type: "success" | "warning" | "error" | "info";
  message: string;
  description?: string;
  onClose?: () => void;
  className?: string;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  type,
  message,
  description,
  onClose,
  className = ""
}) => {
  const { t } = useLanguage();
  const getBannerConfig = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-success-bg border-success-green/20 text-success-green",
          icon: CheckCircle2
        };
      case "error":
        return {
          bg: "bg-danger-bg border-danger-red/20 text-danger-red",
          icon: AlertOctagon
        };
      case "warning":
        return {
          bg: "bg-warning-bg border-warning-amber/20 text-warning-amber",
          icon: AlertTriangle
        };
      case "info":
      default:
        return {
          bg: "bg-sky-light-bg border-sky-blue/20 text-indigo-primary",
          icon: Info
        };
    }
  };

  const config = getBannerConfig();
  const Icon = config.icon;

  return (
    <div className={`border rounded-lg p-4 flex gap-3 shadow-2xs ${config.bg} ${className}`}>
      <Icon className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="flex-1">
        <span className="text-sm font-bold block">{message}</span>
        {description && <p className="text-xs mt-1 text-dark-text/90 leading-relaxed">{description}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-black/5 text-inherit h-fit"
          aria-label={t("common.close")}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

// LoadingState
export const LoadingState: React.FC<{ message?: string; className?: string }> = ({
  message = "Processing guidance...",
  className = ""
}) => {
  const { t } = useLanguage();
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center bg-white border border-borders rounded-lg shadow-2xs ${className}`}>
      <Loader2 className="h-8 w-8 text-indigo-primary animate-spin mb-4" />
      <span className="text-sm font-bold text-dark-text">{message}</span>
      <p className="text-xs text-secondary-text mt-1.5 max-w-xs">
        {t("common.loading")}
      </p>
    </div>
  );
};

// EmptyState
interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center bg-white border border-borders rounded-lg shadow-2xs ${className}`}>
      <div className="bg-slate-50 p-4 rounded-full mb-4">
        <Inbox className="h-8 w-8 text-secondary-text/80" />
      </div>
      <span className="text-sm font-bold text-dark-text">{title}</span>
      <p className="text-xs text-secondary-text mt-1 max-w-xs leading-relaxed">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

// ErrorState
interface ErrorStateProps {
  title: string;
  description: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  description,
  onRetry,
  className = ""
}) => {
  const { t } = useLanguage();
  return (
    <div className={`flex flex-col items-center justify-center p-10 text-center bg-danger-bg border border-danger-red/10 rounded-lg shadow-2xs ${className}`}>
      <AlertOctagon className="h-8 w-8 text-danger-red mb-3" />
      <span className="text-sm font-bold text-danger-red">{title}</span>
      <p className="text-xs text-secondary-text mt-1 max-w-xs leading-relaxed">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-3.5 py-2 text-xs font-semibold text-white bg-danger-red hover:bg-danger-red/90 rounded-lg transition-colors"
        >
          {t("common.search")}
        </button>
      )}
    </div>
  );
};

// Toast notification component and manager simple hook helper (exported styles only, can be managed inline in pages)
interface ToastProps {
  type: "success" | "warning" | "error" | "info";
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyle = () => {
    switch (type) {
      case "success":
        return "bg-slate-900 border-l-4 border-success-green text-white";
      case "error":
        return "bg-slate-900 border-l-4 border-danger-red text-white";
      case "warning":
        return "bg-slate-900 border-l-4 border-warning-amber text-white";
      case "info":
      default:
        return "bg-slate-900 border-l-4 border-sky-blue text-white";
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg max-w-sm border border-slate-800 animate-in slide-in-from-bottom-5 ${getToastStyle()}`}>
      <span className="text-xs font-semibold">{message}</span>
      <button onClick={onClose} className="p-0.5 rounded hover:bg-white/10 text-slate-400 hover:text-white ml-auto">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
