import React from "react";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Star, Quote, Info } from "lucide-react";

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Avaliações & Experiências"
          title="Quem contrata, recomenda."
          subtitle="Confira o carinho e o feedback de quem já celebrou seus momentos com a Agatha Eventos."
        />

        {/* Clear Notice for Code/UI transparency */}
        <div className="max-w-2xl mx-auto mb-10 p-3 rounded-2xl bg-rose-50/80 border border-rose-100 flex items-center gap-3 text-xs text-rose-800">
          <Info className="w-5 h-5 text-rose-500 shrink-0" />
          <span>
            <strong>Área reservada:</strong> Modelos estruturados para inserção das avaliações e depoimentos reais dos clientes Agatha Eventos.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <Card
              key={item.id}
              className="p-6 sm:p-8 flex flex-col justify-between h-full bg-white border border-slate-100 shadow-sm"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-rose-200" />

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-rose-600 font-medium block">
                    {item.eventType}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {item.location}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
