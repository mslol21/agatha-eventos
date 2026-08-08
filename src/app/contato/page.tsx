import React from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { BASE_LOCATION, INSTAGRAM_HANDLE, INSTAGRAM_URL, buildWhatsAppUrl } from "@/lib/whatsapp";
import { MapPin, MessageCircle, Clock, ShieldCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Contato & Localização | Agatha Eventos São Paulo",
  description:
    "Fale com a equipe Agatha Eventos no Jardim Anália Franco, São Paulo. Solicite seu orçamento via WhatsApp para carrinhos gourmet.",
};

export default function ContatoPage() {
  const FAQS = [
    {
      q: "Com quanto tempo de antecedência devo reservar a data?",
      a: "Recomendamos agendar com o máximo de antecedência possível para garantir a disponibilidade dos carrinhos, especialmente para finais de semana e datas comemorativas.",
    },
    {
      q: "A Agatha Eventos fornece a equipe para operação no evento?",
      a: "Sim! Todos os nossos contratos incluem atendentes uniformizados, treinados e preparados para operar as estações com rapidez, simpatia e toda a higiene necessária.",
    },
    {
      q: "O que está incluso na contratação dos carrinhos gourmet?",
      a: "Fornecemos a estrutura do carrinho, insumos/ingredientes de primeira qualidade, embalagens/descartáveis e a equipe para o período contratado.",
    },
    {
      q: "Atendem em locais fechados ou ao ar livre?",
      a: "Atendemos em ambos os formatos! Nossos carrinhos são compactos, silenciosos e adaptáveis a salões de festas, buffets, residências, jardins e ambientes corporativos.",
    },
  ];

  return (
    <div className="pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionTitle
          badge="Canais de Atendimento"
          title="Fale com a Agatha Eventos"
          subtitle="Estamos à disposição para tirar dúvidas, elaborar propostas e planejar o seu evento com o carinho que ele merece."
        />

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Base de Operações</h3>
            <p className="text-sm text-slate-600 font-medium">{BASE_LOCATION}</p>
            <p className="text-xs text-slate-400">Atendimento em toda SP & Região</p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <MessageCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">WhatsApp Oficial</h3>
            <p className="text-sm text-slate-600 font-medium">Orçamentos e Atendimento Direto</p>
            <Button href={buildWhatsAppUrl()} variant="whatsapp" size="sm">
              Iniciar Conversa
            </Button>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <InstagramIcon className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Instagram</h3>
            <p className="text-sm text-slate-600 font-medium">{INSTAGRAM_HANDLE}</p>
            <Button href={INSTAGRAM_URL} variant="outline" size="sm" target="_blank" rel="noopener noreferrer">
              Seguir no Instagram
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto py-12">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wide">Dúvidas Frequentes</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Perguntas & Respostas
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ServiceArea />
      <QuoteForm />
    </div>
  );
}
