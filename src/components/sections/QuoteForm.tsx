"use client";

import React, { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl, QuoteFormData } from "@/lib/whatsapp";
import { fetchCepAddress, formatCep } from "@/lib/cep";
import { Send, Sparkles, CheckCircle2, MessageCircle, MapPin, Loader2 } from "lucide-react";

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

  // CEP State
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState(false);

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

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setCep(formatted);
    setCepError(false);

    const cleanDigits = formatted.replace(/\D/g, "");
    if (cleanDigits.length === 8) {
      setLoadingCep(true);
      const data = await fetchCepAddress(cleanDigits);
      setLoadingCep(false);
      if (data) {
        setStreet(data.logradouro);
        setNeighborhood(data.bairro);
        const cityState = `${data.localidade} - ${data.uf}`;
        setFormData((prev) => ({ ...prev, city: cityState }));
      } else {
        setCepError(true);
      }
    }
  };

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

    const fullAddress = [
      street ? `Rua: ${street}` : "",
      number ? `Nº: ${number}` : "",
      complement ? `Local: ${complement}` : "",
      neighborhood ? `Bairro: ${neighborhood}` : "",
      formData.city ? `Cidade/UF: ${formData.city}` : "",
      cep ? `CEP: ${cep}` : "",
    ]
      .filter(Boolean)
      .join(", ");

    const url = buildWhatsAppUrl({
      ...formData,
      city: fullAddress || formData.city || "São Paulo e região",
    });
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

            {/* Quantidade de convidados */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Convidados (Aprox.)
              </label>
              <input
                type="text"
                placeholder="Ex: 80 pessoas"
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none"
              />
            </div>
          </div>

          {/* CEP & Automatic Address Lookup Block */}
          <div className="space-y-4 bg-white/90 p-5 sm:p-6 rounded-2xl border border-rose-200 shadow-xs">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Localização do Evento (via CEP)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1 sm:col-span-1">
                <label className="block text-xs font-bold text-slate-800">CEP do Local *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ex: 03314-000"
                    value={cep}
                    onChange={handleCepChange}
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-rose-500 outline-none"
                  />
                  {loadingCep && (
                    <Loader2 className="w-4 h-4 text-rose-500 animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
                  )}
                </div>
                {cepError && (
                  <span className="text-[10px] text-rose-600 font-semibold block pt-1">
                    CEP não localizado. Digite o endereço abaixo.
                  </span>
                )}
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="block text-xs font-bold text-slate-800">Rua / Logradouro</label>
                <input
                  type="text"
                  placeholder="Rua / Avenida"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-rose-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">Número</label>
                <input
                  type="text"
                  placeholder="Nº 100"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-rose-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">Bairro</label>
                <input
                  type="text"
                  placeholder="Bairro"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-rose-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">Cidade / UF</label>
                <input
                  type="text"
                  placeholder="São Paulo - SP"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-rose-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">Complemento / Nome do Buffet</label>
              <input
                type="text"
                placeholder="Ex: Salão de Festas do Condomínio ou Buffet Infantil"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-rose-500 outline-none"
              />
            </div>
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
