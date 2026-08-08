"use client";

import React, { useState } from "react";
import { CatalogProduct } from "@/lib/store";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Users, Sparkles, CheckCircle2, MessageCircle, Calculator, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EventSimulatorProps {
  products: CatalogProduct[];
  selectedServices: string[];
  onToggleService: (serviceName: string) => void;
}

export const EventSimulator: React.FC<EventSimulatorProps> = ({
  products,
  selectedServices,
  onToggleService,
}) => {
  const [guestCount, setGuestCount] = useState<number>(80);
  const [clientName, setClientName] = useState<string>("");
  const [clientWhatsapp, setClientWhatsapp] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [eventType, setEventType] = useState<string>("Aniversário");

  // Calculate estimated total based on selected products
  const selectedProducts = products.filter((p) => selectedServices.includes(p.name));
  const pricePerGuestTotal = selectedProducts.reduce(
    (acc, item) => acc + (item.estimatedPricePerGuest || 10),
    0
  );

  const estimatedTotal = guestCount * pricePerGuestTotal;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildWhatsAppUrl({
      name: clientName,
      whatsapp: clientWhatsapp,
      eventType: eventType,
      city: city,
      guestCount: `${guestCount} convidados`,
      services: selectedServices,
      message: `[Simulador do Catálogo] Estimativa calculada para ${guestCount} convidados.`,
    });
    window.open(url, "_blank");
  };

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold mb-2">
            <Calculator className="w-4 h-4" />
            <span>Simulador de Orçamento</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">Monte o Pacote do Seu Evento</h2>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-xs text-slate-400 block">Itens Selecionados:</span>
          <span className="text-xl font-extrabold text-rose-400">
            {selectedServices.length} Carrinho(s)
          </span>
        </div>
      </div>

      {/* Guest Count Slider */}
      <div className="space-y-4 bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Users className="w-5 h-5 text-rose-400" />
            <span>Quantidade de Convidados:</span>
          </label>
          <span className="text-2xl font-black text-rose-400 bg-rose-950/80 px-4 py-1 rounded-xl border border-rose-800/50">
            {guestCount} pessoas
          </span>
        </div>

        <input
          type="range"
          min="30"
          max="300"
          step="10"
          value={guestCount}
          onChange={(e) => setGuestCount(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
        />

        <div className="flex justify-between text-[11px] text-slate-400">
          <span>30 convidados (Íntimo)</span>
          <span>150 convidados (Médio)</span>
          <span>300+ convidados (Grande)</span>
        </div>
      </div>

      {/* Selected Products Quick Toggle List */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Escolha os Carrinhos Gourmet do seu Pacote:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((p) => {
            const isSelected = selectedServices.includes(p.name);
            return (
              <button
                type="button"
                key={p.id}
                onClick={() => onToggleService(p.name)}
                className={`p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between border cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white border-rose-400 shadow-md shadow-rose-900/30"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="truncate">{p.name}</span>
                </div>
                {isSelected ? (
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                ) : (
                  <span className="text-[10px] opacity-60">+ Adicionar</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Estimate Card */}
      {selectedServices.length > 0 && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs text-slate-400">Estimativa aproximada para {guestCount} convidados:</span>
            <div className="text-3xl font-black text-amber-400">
              R$ {estimatedTotal.toLocaleString("pt-BR")},00
              <span className="text-xs font-normal text-slate-400 block sm:inline sm:ml-2">
                (~ R$ {pricePerGuestTotal}/convidado)
              </span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 max-w-xs text-center sm:text-right">
            * Valores estimativos sujeitos a confirmação de data, local e especificações de cardápio.
          </div>
        </div>
      )}

      {/* Direct Contact Form */}
      <form onSubmit={handleSendWhatsApp} className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-sm font-bold text-slate-200">Preencha seus dados para receber a proposta oficial:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            required
            placeholder="Seu Nome *"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-rose-500 outline-none"
          />
          <input
            type="tel"
            required
            placeholder="Seu WhatsApp *"
            value={clientWhatsapp}
            onChange={(e) => setClientWhatsapp(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-rose-500 outline-none"
          />
          <input
            type="text"
            placeholder="Cidade / Bairro *"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-rose-500 outline-none"
          />
        </div>

        <div className="pt-2 text-center sm:text-right">
          <Button
            type="submit"
            variant="whatsapp"
            size="lg"
            disabled={selectedServices.length === 0}
            className="w-full sm:w-auto"
            icon={<MessageCircle className="w-5 h-5" />}
          >
            Solicitar este Pacote no WhatsApp
          </Button>
        </div>
      </form>
    </div>
  );
};
