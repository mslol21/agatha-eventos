"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getStoredProducts, CatalogProduct } from "@/lib/store";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EventSimulator } from "@/components/catalog/EventSimulator";
import { ProductDetailModal } from "@/components/catalog/ProductDetailModal";
import { Search, Sparkles, Plus, Check, Eye, Popcorn, Utensils, Sandwich, Cake, Palette } from "lucide-react";

export default function CatalogoPage() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [search, setSearch] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const [selectedServices, setSelectedServices] = useState<string[]>(["Pipoca Gourmet"]);
  const [activeModalProduct, setActiveModalProduct] = useState<CatalogProduct | null>(null);

  useEffect(() => {
    setProducts(getStoredProducts().filter((p) => p.active));
  }, []);

  const handleToggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "todos" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionTitle
          badge="Catálogo & Simulador Agatha Eventos"
          title="Escolha seus Carrinhos & Monte seu Evento"
          subtitle="Explore nossas atrações gastronômicas, confira detalhes dos insumos e monte o pacote ideal para a sua comemoração."
        />

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-4 rounded-3xl bg-slate-50 border border-slate-200/80">
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar sabor ou carrinho..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: "todos", label: "Todos" },
              { id: "salgados", label: "Salgados" },
              { id: "doces", label: "Doces" },
              { id: "personalizados", label: "Personalizados" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-rose-500 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((p) => {
            const isSelected = selectedServices.includes(p.name);
            return (
              <Card key={p.id} className="flex flex-col justify-between h-full group bg-white">
                <div>
                  <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />

                    {p.badge && (
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-rose-600 font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                        {p.badge}
                      </span>
                    )}

                    <button
                      onClick={() => setActiveModalProduct(p)}
                      className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-800 p-2.5 rounded-xl shadow-md backdrop-blur-md transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-rose-500" />
                      <span>Ver Detalhes</span>
                    </button>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                        {p.name}
                      </h3>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-lg">
                        {p.category}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {p.shortDescription}
                    </p>

                    <div className="pt-2 text-xs font-semibold text-rose-600 flex items-center gap-1">
                      <span>Estimativa: ~ R$ {p.estimatedPricePerGuest || 10}/convidado</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleToggleService(p.name)}
                    className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-200"
                        : "bg-rose-50 hover:bg-rose-100 text-rose-700"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Adicionado ao Pacote</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Adicionar ao Simulador</span>
                      </>
                    )}
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Live Simulator Section */}
        <EventSimulator
          products={products}
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
        />
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onSelectProduct={handleToggleService}
        isSelected={
          activeModalProduct
            ? selectedServices.includes(activeModalProduct.name)
            : false
        }
      />
    </div>
  );
}
