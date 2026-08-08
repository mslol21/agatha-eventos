import React from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { MessageSquareText, Utensils, CalendarDays, Send } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const STEPS = [
    {
      number: "01",
      title: "Conte sobre seu evento",
      description: "Diga se é uma festa infantil, casamento, aniversário ou evento corporativo.",
      icon: <MessageSquareText className="w-6 h-6 text-rose-500" />,
    },
    {
      number: "02",
      title: "Escolha suas experiências",
      description: "Selecione seus carrinhos favoritos (pipoca, crepe, algodão doce, hot dog, brigadeiro).",
      icon: <Utensils className="w-6 h-6 text-rose-500" />,
    },
    {
      number: "03",
      title: "Defina data e local",
      description: "Informe o dia da celebração, a cidade e a estimativa de convidados.",
      icon: <CalendarDays className="w-6 h-6 text-rose-500" />,
    },
    {
      number: "04",
      title: "Receba sua proposta",
      description: "Enviaremos uma proposta personalizada diretamente no seu WhatsApp sem compromisso.",
      icon: <Send className="w-6 h-6 text-rose-500" />,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Passo a Passo Simples"
          title="É fácil levar a Agatha Eventos para sua festa."
          subtitle="Em apenas 4 etapas você garante uma atração inesquecível para os seus convidados."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((step, index) => (
            <div
              key={index}
              className="relative p-8 rounded-3xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between hover-lift group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black text-rose-200 group-hover:text-rose-400 transition-colors">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 pt-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button href="/orcamento" variant="primary" size="lg">
            Quero solicitar um orçamento
          </Button>
        </div>
      </div>
    </section>
  );
};
