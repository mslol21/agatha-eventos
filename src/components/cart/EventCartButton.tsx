"use client";

import React from "react";
import { useEventCart } from "@/context/EventCartContext";
import { PopcornCartIcon } from "@/components/ui/PopcornCartIcon";

interface EventCartButtonProps {
  variant?: "floating" | "inline";
}

export const EventCartButton: React.FC<EventCartButtonProps> = ({ variant = "floating" }) => {
  const { totalItemsCount, openCart, totalEstimatedPrice } = useEventCart();

  if (variant === "inline") {
    return (
      <button
        onClick={openCart}
        className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs sm:text-sm transition-all border border-rose-200 shadow-xs cursor-pointer active:scale-95"
      >
        <PopcornCartIcon className="w-5 h-5 shrink-0" />
        <span>Carrinho Gourmet</span>
        {totalItemsCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-black flex items-center justify-center">
            {totalItemsCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={openCart}
      aria-label="Abrir Carrinho Gourmet"
      className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border border-slate-700 transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none cursor-pointer"
    >
      <div className="relative flex items-center justify-center">
        <PopcornCartIcon className="w-7 h-7" />
        {totalItemsCount > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-md animate-bounce">
            {totalItemsCount}
          </span>
        )}
      </div>

      <div className="hidden sm:flex flex-col text-left">
        <span className="font-extrabold text-xs text-white">Carrinho Gourmet</span>
        <span className="text-[10px] text-rose-300 font-medium">
          {totalItemsCount === 0
            ? "Escolher Sabores"
            : `~ R$ ${totalEstimatedPrice.toLocaleString("pt-BR")}`}
        </span>
      </div>
    </button>
  );
};
