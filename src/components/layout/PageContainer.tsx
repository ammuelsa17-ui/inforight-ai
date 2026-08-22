import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

/**
 * Standard InfoRight AI Page Container
 * Enforces unified max-width and horizontal/vertical rhythm.
 * - default: max-w-7xl (for multi-column grids, dashboards, locators)
 * - narrow: max-w-4xl (for reading-heavy rights guides, legal explanations)
 * - wide: max-w-7xl
 */
export function PageContainer({
  children,
  className = "",
  size = "default"
}: PageContainerProps) {
  const sizeClass = size === "narrow" ? "max-w-4xl" : "max-w-7xl";

  return (
    <main className={`w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 ${sizeClass} ${className}`}>
      {children}
    </main>
  );
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Standard InfoRight AI Page Header
 * Left-aligned, consistent typography scale, and unified description width.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  className = ""
}: PageHeaderProps) {
  return (
    <div className={`mb-8 md:mb-10 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          {eyebrow && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide uppercase">
              {eyebrow}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0 flex items-center gap-3">{action}</div>}
      </div>
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Standard Section Header for sub-cards and content blocks
 */
export function SectionHeader({
  title,
  description,
  action,
  className = ""
}: SectionHeaderProps) {
  return (
    <div className={`flex items-start justify-between gap-3 mb-4 ${className}`}>
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-xs md:text-sm text-slate-500 mt-1 leading-normal">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
