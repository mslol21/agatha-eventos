import React from "react";
import { Gallery } from "@/components/sections/Gallery";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Galeria de Fotos | Agatha Eventos",
  description:
    "Confira fotos reais de nossos carrinhos gourmet, estações de alimentos, equipe e eventos realizados em São Paulo.",
};

export default function GaleriaPage() {
  return (
    <div className="pt-32 sm:pt-36 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <SectionTitle
          badge="Portfólio & Momentos"
          title="Galeria de Fotos Agatha Eventos"
          subtitle="Inspire-se com os nossos carrinhos em ação e descubra como podemos encantar seus convidados."
        />
      </div>

      <Gallery />
      <QuoteForm />
      <FinalCTA />
    </div>
  );
}
