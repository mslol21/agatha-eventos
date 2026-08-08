"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Sparkles, Star, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-pink-soft-gradient">
      {/* Background Decor Elements */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-rose-200/20 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-sky-200/30 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            {/* Top Brand Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-rose-200/80 shadow-sm backdrop-blur-sm text-xs sm:text-sm font-semibold text-rose-600">
              <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>AGATHA EVENTOS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span className="text-slate-600 font-normal">Carrinhos Gourmet</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Sabor, charme e diversão para{" "}
              <span className="text-gradient-pink relative inline-block">
                transformar seu evento.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-rose-300/60" viewBox="0 0 200 12" fill="none">
                  <path d="M2 9C50 3 150 3 198 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Carrinhos gourmet, comidas rápidas e experiências deliciosas para festas, eventos corporativos e celebrações especiais.
            </p>

            {/* Location Coverage Badge */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-white/80 border border-slate-200/80 px-4 py-2.5 rounded-2xl shadow-xs mx-auto lg:mx-0">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="font-semibold text-slate-900">São Paulo Capital</span>
              <span className="text-slate-300">•</span>
              <span>Região</span>
              <span className="text-slate-300">•</span>
              <span>Interior</span>
              <span className="text-slate-300">•</span>
              <span>Litoral</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button href="/orcamento" variant="primary" size="lg" className="w-full sm:w-auto shadow-rose-300/50">
                Solicitar orçamento
              </Button>
              <Button href="/servicos" variant="outline" size="lg" className="w-full sm:w-auto" icon={<ChevronRight className="w-5 h-5" />}>
                Conhecer nossos sabores
              </Button>
            </div>

            {/* Mini Trust Stats */}
            <div className="pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-slate-900 text-xs sm:text-sm">Carinho</span>
                  <span className="text-[11px] text-slate-500">Em cada detalhe</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-slate-900 text-xs sm:text-sm">Qualidade</span>
                  <span className="text-[11px] text-slate-500">Ingredientes nobres</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-slate-900 text-xs sm:text-sm">Experiência</span>
                  <span className="text-[11px] text-slate-500">Feito na hora</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-rose-200 via-sky-200 to-amber-100 rounded-3xl blur-xl opacity-70 transform rotate-2 pointer-events-none" />

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[1/1] bg-slate-100">
                <Image
                  src="/images/hero.jpg"
                  alt="Carrinho Gourmet Agatha Eventos"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                {/* Floating Overlay Badge 1 */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-sm">
                    100%
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900 text-xs">Preparo Ao Vivo</span>
                    <span className="text-[10px] text-slate-500">Sabor & Aroma Fresquinho</span>
                  </div>
                </div>

                {/* Floating Overlay Badge 2 */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/80 flex items-center justify-between">
                  <div>
                    <span className="block font-bold text-slate-900 text-sm">Agatha Eventos</span>
                    <span className="text-xs text-rose-600 font-medium">Jardim Anália Franco — SP</span>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                    Premium Carts
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
