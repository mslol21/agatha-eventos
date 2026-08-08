"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TrustBar } from "@/components/sections/TrustBar";
import { SectionTitle } from "@/components/ui/SectionTitle";

function QuoteFormContent() {
  const searchParams = useSearchParams();
  const servico = searchParams.get("servico") || undefined;
  const tipo = searchParams.get("tipo") || undefined;

  return (
    <>
      <QuoteForm defaultService={servico} defaultEventType={tipo} />
    </>
  );
}

export default function OrcamentoPage() {
  return (
    <div className="pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionTitle
          badge="Proposta Rápida & Personalizada"
          title="Solicite seu Orçamento Sem Compromisso"
          subtitle="Preencha os dados do seu evento abaixo e enviaremos uma proposta completa e transparente via WhatsApp."
        />
      </div>

      <Suspense fallback={<div className="text-center py-12 text-slate-500">Carregando formulário...</div>}>
        <QuoteFormContent />
      </Suspense>

      <HowItWorks />
      <TrustBar />
    </div>
  );
}
