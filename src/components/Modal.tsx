"use client";

import React, { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = "md"
}) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "max-w-md";
      case "lg":
        return "max-w-2xl";
      case "xl":
        return "max-w-4xl";
      case "md":
      default:
        return "max-w-lg";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={`w-full bg-white border border-borders rounded-lg shadow-xl overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-200 ${getSizeClasses()} max-h-[90vh]`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-borders flex items-center justify-between bg-slate-50/50">
          <h3 id="modal-title" className="text-sm font-bold text-dark-text uppercase tracking-wider">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-100 text-secondary-text hover:text-dark-text transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-sm text-dark-text leading-relaxed flex-1">
          {children}
        </div>

        {/* Footer */}
        {actions && (
          <div className="px-5 py-3.5 border-t border-borders bg-slate-50/50 flex justify-end gap-3.5">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
export default Modal;
