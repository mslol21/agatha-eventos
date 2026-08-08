import React from "react";

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left" | "right";
  dark?: boolean;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  title,
  subtitle,
  align = "center",
  dark = false,
  className = "",
}) => {
  const alignClasses = {
    center: "text-center items-center mx-auto",
    left: "text-left items-start",
    right: "text-right items-end",
  };

  return (
    <div className={`flex flex-col max-w-3xl mb-12 sm:mb-16 ${alignClasses[align]} ${className}`}>
      {badge && (
        <span
          className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4 shadow-sm ${
            dark
              ? "bg-rose-950/80 text-rose-300 border border-rose-800/40"
              : "bg-rose-100/90 text-rose-700 border border-rose-200"
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base sm:text-lg lg:text-xl font-normal leading-relaxed ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
