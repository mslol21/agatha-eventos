import React from "react";
import Metadata from "next";
import { Services } from "@/components/sections/Services";
import { AboutExperience } from "@/components/sections/AboutExperience";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Carrinhos Gourmet & Sabores | Agatha Eventos",
  description:
    "Pipoca gourmet, crepe suíço, algodão doce, hot dog, brigadeiro de colher e experiências personalizadas para festas e eventos em São Paulo.",
};

export default function ServicosPage() {
  return (
    <div className="pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionTitle
          badge="Nossas Estações Gastronômicas"
          title="Carrinhos Gourmet & Sabores Inesquecíveis"
          subtitle="Conheça nossas opções preparadas ao vivo com ingredientes selecionados, higiene rigorosa e apresentação impecável."
        />
      </div>

      <Services />
      <AboutExperience />
      <QuoteForm />
      <FinalCTA />
    </div>
  );
}
