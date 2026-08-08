import React from "react";
import { CorporateEvents } from "@/components/sections/CorporateEvents";
import { TrustBar } from "@/components/sections/TrustBar";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Eventos Corporativos | Agatha Eventos B2B",
  description:
    "Carrinhos gourmet para convenções, feiras, endomarketing, lançamentos e confraternizações de empresas em São Paulo.",
};

export default function EventosCorporativosPage() {
  return (
    <div className="pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionTitle
          badge="Soluções B2B & Ativações de Marca"
          title="Experiências Gastronômicas Corporativas"
          subtitle="Agregue valor à imagem da sua empresa com estações charmosas, emissão de Nota Fiscal, atendimento ágil e pontualidade rigorosa."
        />
      </div>

      <CorporateEvents />
      <TrustBar />
      <QuoteForm defaultEventType="Corporativo" />
      <FinalCTA />
    </div>
  );
}
