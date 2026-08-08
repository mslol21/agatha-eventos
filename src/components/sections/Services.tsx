"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SERVICES_DATA } from "@/data/services";
import { useEventCart } from "@/context/EventCartContext";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Popcorn, Utensils, Sparkles, Sandwich, Cake, Palette, ShoppingBag, Check } from "lucide-react";

export const Services: React.FC = () => {
  const { addToCart, isInCart, openCart } = useEventCart();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Popcorn":
        return <Popcorn className="w-5 h-5 text-rose-500" />;
      case "Utensils":
        return <Utensils className="w-5 h-5 text-sky-500" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case "Sandwich":
        return <Sandwich className="w-5 h-5 text-emerald-500" />;
      case "Cake":
        return <Cake className="w-5 h-5 text-purple-500" />;
      case "Palette":
        return <Palette className="w-5 h-5 text-rose-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-rose-500" />;
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Carrinhos & Opções Gastronômicas"
          title="Nossos sabores fazem parte da festa"
          subtitle="Adicione experiências ao seu carrinho de evento e veja o cálculo adaptado à quantidade de convidados."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => {
            const added = isInCart(service.id) || isInCart(service.name);

            return (
              <Card key={service.id} className="group flex flex-col justify-between h-full">
                <div>
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {service.badge && (
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-rose-600 font-bold text-xs px-3 py-1 rounded-full shadow-sm">
                        {service.badge}
                      </span>
                    )}

                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md">
                      {getIcon(service.iconName)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                        {service.name}
                      </h3>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-full">
                        Mínimo: {service.id === "crepe-suico" ? 50 : 30} conv.
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Highlights List */}
                    <ul className="pt-2 space-y-1.5 border-t border-slate-100">
                      {service.highlights.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-500 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Cart Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      if (added) {
                        openCart();
                      } else {
                        addToCart({
                          id: service.id,
                          name: service.name,
                          shortDescription: service.shortDescription,
                          fullDescription: service.fullDescription,
                          image: service.image,
                          badge: service.badge,
                          iconName: service.iconName,
                          highlights: service.highlights,
                          active: true,
                          category: "salgados",
                          estimatedPricePerGuest: service.id === "crepe-suico" ? 15 : 10,
                        });
                      }
                    }}
                    className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      added
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-200"
                        : "bg-rose-50 hover:bg-rose-100 text-rose-700"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Adicionado! Ver Carrinho</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Adicionar ao Carrinho de Evento</span>
                      </>
                    )}
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Global Services CTA */}
        <div className="mt-14 text-center">
          <Button href="/catalogo" variant="primary" size="lg">
            Ver catálogo completo com simulador
          </Button>
        </div>
      </div>
    </section>
  );
};
