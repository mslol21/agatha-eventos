import React from "react";
import { Users, HeartHandshake, MapPin, UtensilsCrossed } from "lucide-react";

export const TrustBar: React.FC = () => {
  const TRUST_ITEMS = [
    {
      icon: <Users className="w-5 h-5 text-rose-500" />,
      title: "Eventos Particulares e Corporativos",
      subtitle: "Do aniversário à grande convenção",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-rose-500" />,
      title: "Atendimento Personalizado",
      subtitle: "Estrutura e equipe dedicadas",
    },
    {
      icon: <MapPin className="w-5 h-5 text-rose-500" />,
      title: "São Paulo e Região",
      subtitle: "Capital, ABC, Interior e Litoral",
    },
    {
      icon: <UtensilsCrossed className="w-5 h-5 text-rose-500" />,
      title: "Experiência Gastronômica",
      subtitle: "Produtos deliciosos feitos na hora",
    },
  ];

  return (
    <section className="bg-white border-y border-slate-100 py-6 sm:py-8 shadow-xs relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_ITEMS.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-2xl hover:bg-rose-50/50 transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-rose-100/70 flex items-center justify-center shrink-0 border border-rose-200/50">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                  {item.title}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-500">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
