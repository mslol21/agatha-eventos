"use client";

import React, { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl, QuoteFormData } from "@/lib/whatsapp";
import { Send, Sparkles, CheckCircle2, MessageCircle } from "lucide-react";

interface QuoteFormProps {
  defaultService?: string;
  defaultEventType?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  defaultService,
  defaultEventType,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    whatsapp: "",
    eventType: defaultEventType || "Aniversário",
    eventDate: "",
    city: "",
    guestCount: "",
    services: defaultService ? [defaultService] : ["Pipoca Gourmet"],
    message: "",
  });

  const EVENT_OPTIONS = [
    "Corporativo",
    "Aniversário",
    "Festa Infantil",
    "Casamento",
    "Formatura",
    "Confraternização",
    "Feira/Eventos",
    "Outro",
  ];

  const SERVICE_OPTIONS = [
    "Pipoca Gourmet",
    "Crepe Suíço",
    "Algodão Doce",
    "Hot Dog Gourmet",
    "Brigadeiro de Colher",
    "Experiência Personalizada",
  ];

  const handleServiceToggle = (serviceName: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(serviceName);
      if (exists) {
        return {
          ...prev,
          services: prev.services.filter((s) => s !== serviceName),
        };
      } else {
        return {
          ...prev,
          services: [...prev.services, serviceName],
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildWhatsAppUrl(formData);
    window.open(url, "_blank");
  };

  return (
    <section className="py-20 sm:py-28 bg-white relative" id="formulario-orcamento">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Orçamento Rápido Sem Compromisso"
          title="Vamos deixar seu evento ainda mais especial?"
          subtitle="Conte um pouco sobre seu evento e nossa equipe prepara uma proposta personalizada rápida para o seu WhatsApp."
        />

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-10 rounded-3xl bg-pink-soft-gradient border border-rose-100/80 shadow-xl space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Nome */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Seu Nome *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Ana Maria"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none"
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Seu WhatsApp *
              </label>
              <input
                type="tel"
                required
                placeholder="Ex: (11) 99999-9999"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Tipo de evento */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Tipo de Evento *
              </label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none cursor-pointer"
              >
                {EVENT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Data do evento */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Data Estimada
              </label>
              <input
                type="text"
                placeholder="Ex: 25/10/2026 ou A definir"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none"
              />
            </div>

            {/* Cidade */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Cidade / Bairro
              </label>
              <input
                type="text"
                placeholder="Ex: São Paulo - Anália Franco"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none"
              />
            </div>
          </div>

          {/* Quantidade aproximada de convidados */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Quantidade de Convidados (Aproximada)
            </label>
            <input
              type="text"
              placeholder="Ex: 50 pessoas, 100 pessoas, 200+ pessoas"
              value={formData.guestCount}
              onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none"
            />
          </div>

          {/* Serviços de interesse */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Carrinhos & Sabores de Interesse (Selecione um ou mais)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SERVICE_OPTIONS.map((srv) => {
                const isSelected = formData.services.includes(srv);
                return (
                  <button
                    type="button"
                    key={srv}
                    onClick={() => handleServiceToggle(srv)}
                    className={`p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between border cursor-pointer ${
                      isSelected
                        ? "bg-rose-500 text-white border-rose-500 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:border-rose-300"
                    }`}
                  >
                    <span>{srv}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mensagem adicional */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Mensagem Adicional / Detalhes
            </label>
            <textarea
              rows={3}
              placeholder="Ex: Horário do evento, tema da decoração ou observações..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 text-center">
            <Button
              type="submit"
              variant="whatsapp"
              size="lg"
              className="w-full sm:w-auto px-10 shadow-emerald-500/20"
              icon={<MessageCircle className="w-5 h-5" />}
            >
              Solicitar orçamento pelo WhatsApp
            </Button>
            <p className="text-[11px] text-slate-500 mt-3">
              🔒 Seus dados serão utilizados exclusivamente para o envio da proposta personalizada.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
