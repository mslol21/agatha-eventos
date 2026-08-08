import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Building2, CheckCircle2, Award, Users, TrendingUp, Sparkles } from "lucide-react";

export const CorporateEvents: React.FC = () => {
  const CORPORATE_SERVICES = [
    "Confraternizações de Fim de Ano",
    "Ações de Endomarketing & Datas Comemorativas",
    "Lançamentos de Produtos & Inaugurações",
    "Convenções, Feiras & Stands Promocionais",
    "Receção VIP & Eventos com Clientes",
    "Treinamentos & Eventos Internos Empresariais",
  ];

  return (
    <section className="py-20 sm:py-28 bg-corporate-gradient text-white relative overflow-hidden">
      {/* Decorative Lights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-900/80 border border-indigo-700/50 text-xs font-semibold text-indigo-300">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span>Soluções Corporativas Agatha Eventos</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Sua empresa também pode <span className="text-gradient-gold">surpreender.</span>
            </h2>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed">
              Leve uma experiência diferente para colaboradores, clientes e convidados. Atendimento ágil, estrutura impecável e comidinhas preparadas na hora que elevam o engajamento de qualquer evento empresarial.
            </p>

            {/* Grid of Corporate Formats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {CORPORATE_SERVICES.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            {/* Corporate Value Props */}
            <div className="pt-6 border-t border-slate-800 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <span className="block text-amber-400 font-extrabold text-lg sm:text-xl">100% Nota Fiscal</span>
                <span className="text-[11px] text-slate-400">Emissão completa & contrato</span>
              </div>
              <div>
                <span className="block text-amber-400 font-extrabold text-lg sm:text-xl">Alta Capacidade</span>
                <span className="text-[11px] text-slate-400">Públicos pequenos ou massivos</span>
              </div>
              <div>
                <span className="block text-amber-400 font-extrabold text-lg sm:text-xl">Personalização</span>
                <span className="text-[11px] text-slate-400">Carrinho com sua marca</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button href="/orcamento?tipo=Corporativo" variant="corporate" size="lg" icon={<Sparkles className="w-5 h-5 text-amber-400" />}>
                Solicitar orçamento corporativo
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700 aspect-[4/3] bg-slate-800">
              <Image
                src="/images/evento-corporativo.jpg"
                alt="Evento Corporativo Agatha Eventos"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-white text-sm">Experiência B2B Premium</span>
                    <span className="text-xs text-slate-400">Agilidade, higienização & pontualidade</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
