"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GALLERY_DATA } from "@/data/gallery";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/whatsapp";
import { Sparkles, ExternalLink } from "lucide-react";

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<string>("todos");

  const filteredItems = filter === "todos"
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === filter);

  return (
    <section className="py-20 sm:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Galeria de Fotos"
          title="Momentos que já ficaram mais doces"
          subtitle="Confira registros de eventos, nossos carrinhos charmosos e os detalhes que preparamos com tanto carinho."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {[
            { id: "todos", label: "Todos os Registros" },
            { id: "carrinhos", label: "Carrinhos Gourmet" },
            { id: "produtos", label: "Sabores & Doces" },
            { id: "eventos", label: "Festas & Celebrações" },
            { id: "corporativo", label: "Corporativo" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === tab.id
                  ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                  : "bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-600 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-3xl overflow-hidden shadow-md bg-white border border-slate-100 hover-lift ${
                item.aspectRatio === "wide" ? "sm:col-span-2" : ""
              }`}
            >
              <div className="relative w-full aspect-[4/3] bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 text-slate-800 shadow-sm">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <h3 className="font-bold text-sm sm:text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-200 opacity-90 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-14 text-center space-y-4">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Acompanhe nossas montagens diárias e novidades em tempo real no Instagram!
          </p>
          <div className="inline-block">
            <Button
              href={INSTAGRAM_URL}
              variant="outline"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              icon={<InstagramIcon className="w-5 h-5 text-rose-500" />}
            >
              Ver mais no Instagram {INSTAGRAM_HANDLE}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
