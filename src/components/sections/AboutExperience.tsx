import React from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Sparkles, Utensils, Palette, ShieldCheck } from "lucide-react";

export const AboutExperience: React.FC = () => {
  const CARDS = [
    {
      icon: <Sparkles className="w-6 h-6 text-rose-500" />,
      title: "Experiência",
      description: "Carrinhos que encantam adultos e crianças.",
      bg: "bg-rose-50",
      border: "border-rose-100",
    },
    {
      icon: <Utensils className="w-6 h-6 text-sky-500" />,
      title: "Sabor",
      description: "Produtos preparados para proporcionar uma experiência deliciosa.",
      bg: "bg-sky-50",
      border: "border-sky-100",
    },
    {
      icon: <Palette className="w-6 h-6 text-amber-500" />,
      title: "Apresentação",
      description: "Uma estrutura bonita que também faz parte do evento.",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: "Profissionalismo",
      description: "Equipe preparada para atender com carinho, organização e responsabilidade.",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Diferenciais Agatha Eventos"
          title="Muito mais que comida. Uma experiência."
          subtitle="A Agatha Eventos leva até sua comemoração muito mais do que deliciosos sabores. Levamos carrinhos charmosos, atendimento cuidadoso e uma experiência que combina com o estilo de cada evento."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CARDS.map((card, idx) => (
            <Card key={idx} className="p-8 flex flex-col justify-between h-full bg-white">
              <div className="space-y-4">
                <div
                  className={`w-14 h-14 rounded-2xl ${card.bg} border ${card.border} flex items-center justify-center`}
                >
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
