"use client";

import React from "react";
import Image from "next/image";
import { CatalogProduct } from "@/lib/store";
import { X, CheckCircle2, Sparkles, Popcorn, Utensils, Sandwich, Cake, Palette, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProductDetailModalProps {
  product: CatalogProduct | null;
  onClose: () => void;
  onSelectProduct: (productName: string) => void;
  isSelected: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectProduct,
  isSelected,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-white shadow-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative w-full aspect-[16/9] bg-slate-100 shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-rose-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
              {product.badge}
            </span>
          )}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <h2 className="text-2xl font-black">{product.name}</h2>
            <span className="text-xs text-rose-200 uppercase font-semibold tracking-wider">
              {product.category}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-grow">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-2">
              Sobre a Experiência
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {product.fullDescription}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              O que está incluso nesta estação:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-500 block">Estimativa por convidado:</span>
            <span className="text-base font-extrabold text-slate-900">
              ~ R$ {product.estimatedPricePerGuest || 10},00 <span className="text-xs font-normal text-slate-500">/pessoa</span>
            </span>
          </div>

          <Button
            onClick={() => {
              onSelectProduct(product.name);
              onClose();
            }}
            variant={isSelected ? "outline" : "primary"}
            size="md"
            icon={<ShoppingBag className="w-4 h-4" />}
          >
            {isSelected ? "Remover do Pacote" : "Adicionar ao Pacote"}
          </Button>
        </div>
      </div>
    </div>
  );
};
