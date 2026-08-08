import React from "react";

interface PopcornCartFrameProps {
  children: React.ReactNode;
  className?: string;
  badge?: string;
}

export const PopcornCartFrame: React.FC<PopcornCartFrameProps> = ({
  children,
  className = "",
  badge,
}) => {
  return (
    <div className={`relative flex flex-col items-center group transition-transform duration-300 hover:-translate-y-2 ${className}`}>
      {/* 1. Vintage Striped Canopy / Toldo do Carrinho */}
      <div className="w-full relative z-20 overflow-hidden rounded-t-2xl shadow-sm border-x border-t border-rose-200">
        {/* Striped Canopy SVG Pattern */}
        <div className="h-9 sm:h-11 bg-gradient-to-r from-rose-500 via-pink-400 to-rose-500 relative flex items-center justify-between px-3 overflow-hidden">
          {/* Stripes overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #ffffff, #ffffff 10px, transparent 10px, transparent 20px)",
            }}
          />

          {/* Scalloped Awning Edges (Ondinhas do Toldo) */}
          <div className="absolute bottom-0 left-0 right-0 h-3 flex justify-between">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-3 bg-white rounded-t-full border-t border-rose-200"
              />
            ))}
          </div>

          <span className="relative z-10 font-black text-white text-[10px] sm:text-xs tracking-widest uppercase text-shadow-sm flex items-center gap-1">
            🍿 Gourmet Cart
          </span>

          {badge && (
            <span className="relative z-10 bg-white text-rose-600 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs">
              {badge}
            </span>
          )}
        </div>
      </div>

      {/* 2. Cart Body / Conteúdo do Card */}
      <div className="w-full bg-white border-x border-b border-rose-200/80 rounded-b-3xl shadow-xl overflow-hidden relative z-10 flex flex-col justify-between">
        {children}
      </div>

      {/* 3. Vintage Cart Wheels & Support Legs / Rodas do Carrinho de Pipoca */}
      <div className="w-full flex items-center justify-between px-6 -mt-3 relative z-30 pointer-events-none">
        {/* Left Wheel */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-4 border-rose-400 shadow-md flex items-center justify-center group-hover:rotate-45 transition-transform duration-700">
          <div className="w-8 h-8 rounded-full border-2 border-rose-300 flex items-center justify-center">
            {/* Wheel Spokes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-rose-200" />
              <div className="h-full w-0.5 bg-rose-200 absolute" />
              <div className="w-full h-0.5 bg-rose-200 rotate-45 absolute" />
              <div className="w-full h-0.5 bg-rose-200 -rotate-45 absolute" />
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 z-10" />
          </div>
        </div>

        {/* Center Cart Stand Handle */}
        <div className="h-4 w-12 bg-gradient-to-r from-rose-300 to-amber-300 rounded-full shadow-inner border border-white" />

        {/* Right Wheel */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-4 border-rose-400 shadow-md flex items-center justify-center group-hover:-rotate-45 transition-transform duration-700">
          <div className="w-8 h-8 rounded-full border-2 border-rose-300 flex items-center justify-center">
            {/* Wheel Spokes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-rose-200" />
              <div className="h-full w-0.5 bg-rose-200 absolute" />
              <div className="w-full h-0.5 bg-rose-200 rotate-45 absolute" />
              <div className="w-full h-0.5 bg-rose-200 -rotate-45 absolute" />
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};
