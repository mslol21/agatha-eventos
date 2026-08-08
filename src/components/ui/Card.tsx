import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  dark?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverEffect = true,
  dark = false,
}) => {
  return (
    <div
      className={`rounded-2xl sm:rounded-3xl transition-all duration-300 overflow-hidden ${
        dark
          ? "bg-slate-900/90 border border-slate-800 text-slate-100 shadow-xl"
          : "bg-white border border-slate-100/80 text-slate-800 shadow-sm shadow-slate-200/50"
      } ${hoverEffect ? "hover-lift hover:border-rose-200 hover:shadow-lg" : ""} ${className}`}
    >
      {children}
    </div>
  );
};
