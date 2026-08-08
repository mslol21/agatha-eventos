import React from "react";
import Link from "next/link";
import { EVENT_TYPES_DATA } from "@/data/events";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import {
  Briefcase,
  PartyPopper,
  Heart,
  GraduationCap,
  Smile,
  Users,
  Store,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const EventTypes: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Briefcase":
        return <Briefcase className="w-6 h-6 text-indigo-600" />;
      case "PartyPopper":
        return <PartyPopper className="w-6 h-6 text-rose-500" />;
      case "Heart":
        return <Heart className="w-6 h-6 text-pink-500" />;
      case "GraduationCap":
        return <GraduationCap className="w-6 h-6 text-sky-500" />;
      case "Smile":
        return <Smile className="w-6 h-6 text-amber-500" />;
      case "Users":
        return <Users className="w-6 h-6 text-emerald-500" />;
      case "Store":
        return <Store className="w-6 h-6 text-purple-500" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-rose-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-rose-500" />;
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-pink-soft-gradient relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Ocasiões Atendidas"
          title="Uma experiência para cada ocasião"
          subtitle="Seja para comemorações íntimas ou grandes públicos, nossos carrinhos gourmet se adaptam perfeitamente ao formato da sua celebração."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {EVENT_TYPES_DATA.map((eventItem) => (
            <Card
              key={eventItem.id}
              className="p-6 sm:p-8 flex flex-col justify-between h-full bg-white/90 backdrop-blur-sm border-white/80"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-xs">
                  {getIcon(eventItem.iconName)}
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {eventItem.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {eventItem.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-4">
                <Link
                  href={`/orcamento?tipo=${encodeURIComponent(eventItem.title)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors group"
                >
                  <span>{eventItem.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
