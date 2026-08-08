import React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "whatsapp" | "corporate";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: React.ReactNode;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  icon,
  target,
  rel,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs sm:text-sm shadow-sm gap-1.5",
    md: "px-6 py-3 text-sm sm:text-base shadow-md gap-2",
    lg: "px-8 py-4 text-base sm:text-lg shadow-lg gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-rose-200 hover:shadow-rose-300 focus:ring-rose-400",
    secondary:
      "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-200 focus:ring-slate-700",
    outline:
      "bg-white/80 backdrop-blur-sm border-2 border-rose-300 text-slate-800 hover:bg-rose-50 hover:border-rose-400 hover:text-rose-600 focus:ring-rose-300",
    whatsapp:
      "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200 hover:shadow-emerald-300 focus:ring-emerald-400",
    corporate:
      "bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 hover:from-slate-800 hover:to-indigo-900 text-white border border-indigo-700/50 shadow-indigo-900/20 focus:ring-indigo-500",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (href.startsWith("http") || href.startsWith("https") || href.startsWith("wa.me")) {
      return (
        <a
          href={href}
          target={target || "_blank"}
          rel={rel || "noopener noreferrer"}
          className={combinedClasses}
        >
          {variant === "whatsapp" && !icon && <MessageCircle className="w-5 h-5" />}
          {icon}
          <span>{children}</span>
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses}>
        {icon}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {variant === "whatsapp" && !icon && <MessageCircle className="w-5 h-5" />}
      {icon}
      <span>{children}</span>
    </button>
  );
};
