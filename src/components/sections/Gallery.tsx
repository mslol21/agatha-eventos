"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GALLERY_DATA, GalleryItem } from "@/data/gallery";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, buildWhatsAppUrl } from "@/lib/whatsapp";
import { Sparkles, Maximize2, X, MessageCircle, ArrowRight } from "lucide-react";

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<string>("todos");
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const filteredItems =
    filter === "todos"
      ? GALLERY_DATA
      : GALLERY_DATA.filter((item) => item.category === filter);

  return (
    <section className="py-20 sm:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Galeria de Fotos & Portfólio"
          title="Momentos que já ficaram mais doces"
          subtitle="Confira registros reais de eventos, nossos carrinhos charmosos e os detalhes que preparamos com tanto carinho."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
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
                  : "bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-600 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Professional Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="group relative rounded-3xl overflow-hidden shadow-lg bg-slate-900 aspect-[4/3] cursor-pointer hover-lift transition-all duration-300 border border-slate-100"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-108 opacity-95 group-hover:opacity-100"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent transition-opacity" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 text-slate-900 shadow-sm backdrop-blur-md">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Zoom Icon Button */}
              <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                <Maximize2 className="w-4 h-4 text-rose-600" />
              </div>

              {/* Photo Text Content */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-1">
                <h3 className="font-bold text-base sm:text-lg leading-snug group-hover:text-rose-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed opacity-90">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-pink-soft-gradient border border-rose-100 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              Atualizações Diárias
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Quer ver mais montagens ao vivo?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Acompanhe nossos stories no Instagram {INSTAGRAM_HANDLE} com fotos diárias das festas.
            </p>
          </div>

          <Button
            href={INSTAGRAM_URL}
            variant="outline"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            icon={<InstagramIcon className="w-5 h-5 text-rose-500" />}
          >
            Siga {INSTAGRAM_HANDLE}
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-800/90 text-white flex items-center justify-center hover:bg-rose-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo View */}
            <div className="relative w-full md:w-2/3 aspect-[4/3] bg-black shrink-0">
              <Image
                src={activeLightbox.image}
                alt={activeLightbox.title}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-cover"
              />
            </div>

            {/* Lightbox Details */}
            <div className="p-6 sm:p-8 md:w-1/3 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  {activeLightbox.categoryLabel}
                </span>

                <h3 className="text-xl font-bold">{activeLightbox.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeLightbox.description}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <Button
                  href={buildWhatsAppUrl({
                    message: `Olá! Vi a foto de "${activeLightbox.title}" na galeria do site e gostaria de solicitar um orçamento para o meu evento.`,
                  })}
                  variant="whatsapp"
                  size="md"
                  className="w-full"
                  icon={<MessageCircle className="w-4 h-4" />}
                >
                  Quero no Meu Evento
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
