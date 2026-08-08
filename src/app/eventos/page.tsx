import React from "react";
import { EventTypes } from "@/components/sections/EventTypes";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Tipos de Eventos | Agatha Eventos São Paulo",
  description:
    "Experiências gastronômicas para festas infantis, aniversários, casamentos, formaturas, confraternizações e eventos corporativos.",
};

export default function EventosPage() {
  return (
    <div className="pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionTitle
          badge="Soluções para Todo Tipo de Festa"
          title="Experiências Gastronômicas para Cada Ocasião"
          subtitle="Seja uma celebração familiar aconchegante ou uma grande convenção, adaptamos a estrutura ao seu espaço e estilo."
        />
      </div>

      <EventTypes />
      <ServiceArea />
      <QuoteForm />
      <FinalCTA />
    </div>
  );
}
