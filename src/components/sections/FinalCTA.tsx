import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/hero.jpg"
          alt="Agatha Eventos Celebrations"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-slate-900/80 backdrop-blur-md p-8 sm:p-14 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/20 border border-rose-500/40 text-xs font-bold text-rose-300">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>AGATHA EVENTOS • SÃO PAULO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Seu evento merece uma <span className="text-gradient-pink">experiência especial.</span>
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Conte para a Agatha Eventos como será o seu evento e vamos criar uma proposta personalizada para você.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              href="/orcamento"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Solicitar orçamento
            </Button>

            <Button
              href={buildWhatsAppUrl()}
              variant="whatsapp"
              size="lg"
              className="w-full sm:w-auto"
              icon={<MessageCircle className="w-5 h-5" />}
            >
              Falar pelo WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
