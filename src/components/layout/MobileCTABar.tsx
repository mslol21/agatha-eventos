"use client";

import React from "react";
import Link from "next/link";
import { MessageSquareQuote } from "lucide-react";

export const MobileCTABar: React.FC = () => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-rose-100 p-2.5 shadow-2xl flex items-center justify-center">
      <Link
        href="/orcamento"
        className="w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 shadow-md shadow-rose-200 active:scale-98 transition-all"
      >
        <MessageSquareQuote className="w-5 h-5" />
        <span>💬 Solicitar orçamento</span>
      </Link>
    </div>
  );
};
