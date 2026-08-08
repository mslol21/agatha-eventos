import React from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BASE_LOCATION } from "@/lib/whatsapp";
import { MapPin, Navigation, Compass, AlertCircle, CheckCircle2 } from "lucide-react";

export const ServiceArea: React.FC = () => {
  const REGIONS = [
    {
      name: "São Paulo Capital",
      description: "Zona Leste, Zona Sul, Zona Norte, Zona Oeste e Centro.",
      badge: "Base Anália Franco",
    },
    {
      name: "Grande São Paulo",
      description: "ABC Paulista, Alphaville, Guarulhos, Osasco e região metropolitana.",
      badge: "Atendimento Rápido",
    },
    {
      name: "Interior de São Paulo",
      description: "Campinas, Sorocaba, Jundiaí, São José dos Campos e cidades próximas.",
      badge: "Sob Consulta",
    },
    {
      name: "Litoral de São Paulo",
      description: "Litoral Norte (Maresias, Ilhabela, Ubatuba) e Litoral Sul (Santos, Guarujá).",
      badge: "Eventos Especiais",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-pink-soft-gradient relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Área de Atendimento"
          title="Levamos a Agatha Eventos até você."
          subtitle="Partindo da nossa base no Jardim Anália Franco, levamos nossos carrinhos gourmet para festas e eventos em toda a região paulista."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Cards */}
          <div className="lg:col-span-7 space-y-4">
            {/* Base Highlight */}
            <div className="p-6 rounded-3xl bg-white border border-rose-200 shadow-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                  Sede & Logística
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Base: {BASE_LOCATION}
                </h3>
                <p className="text-xs text-slate-500">
                  Estrutura preparada com veículos próprios e caixas térmicas para transporte seguro de ingredientes.
                </p>
              </div>
            </div>

            {/* Regions List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REGIONS.map((region, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/90 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {region.name}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                      {region.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {region.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Notice Alert */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-xs text-amber-900">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                <strong>Aviso:</strong> Consulte disponibilidade de data e condições de taxa de deslocamento para sua cidade ou bairro.
              </span>
            </div>
          </div>

          {/* Right Visual Map Representation of SP */}
          <div className="lg:col-span-5 relative">
            <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-500/20 blur-3xl rounded-full" />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-rose-400" />
                  <span className="font-bold text-sm tracking-wide">Mapa de Atendimento SP</span>
                </div>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Compass className="w-4 h-4 text-rose-400" /> Raio Operacional
                </span>
              </div>

              {/* Graphical Representation of SP Regions */}
              <div className="relative py-8 px-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-6">
                <div className="relative inline-block px-6 py-3 rounded-2xl bg-rose-600 text-white font-extrabold text-sm shadow-lg shadow-rose-600/30 border border-rose-400 animate-pulse">
                  📍 Jardim Anália Franco (HQ)
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="block font-bold text-sky-400">Capital & ABC</span>
                    <span className="text-[10px] text-slate-400">Deslocamento Rápido</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="block font-bold text-amber-400">Grande SP</span>
                    <span className="text-[10px] text-slate-400">Alphaville & Região</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="block font-bold text-purple-400">Interior SP</span>
                    <span className="text-[10px] text-slate-400">Campinas & Sorocaba</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="block font-bold text-emerald-400">Litoral SP</span>
                    <span className="text-[10px] text-slate-400">Norte & Sul</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  Levamos toda a estrutura, alimentos, descartáveis e equipe até o local da sua celebração.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
