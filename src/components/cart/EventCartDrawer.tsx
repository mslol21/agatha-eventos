"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useEventCart } from "@/context/EventCartContext";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { fetchCepAddress, formatCep } from "@/lib/cep";
import { PopcornCartIcon } from "@/components/ui/PopcornCartIcon";
import {
  X,
  Trash2,
  ShoppingBag,
  Users,
  MessageCircle,
  AlertCircle,
  MapPin,
  Search,
  Calendar,
  Clock,
  User,
  Mail,
  Home,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export const EventCartDrawer: React.FC = () => {
  const {
    cartItems,
    guestCount,
    isCartOpen,
    closeCart,
    removeFromCart,
    clearCart,
    setGuestCount,
    totalEstimatedPrice,
  } = useEventCart();

  // Form State
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("Aniversário");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [durationHours, setDurationHours] = useState("4 horas");
  const [notes, setNotes] = useState("");

  // Address via CEP State
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [cityUf, setCityUf] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState(false);

  if (!isCartOpen) return null;

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
        setCityUf(`${data.localidade} - ${data.uf}`);
      } else {
        setCepError(true);
      }
    }
  };

  const handleCheckoutWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const itemsFormatted = cartItems
      .map((item, index) => {
        const guestsApplied = Math.max(guestCount, item.minGuests);
        const itemTotal = guestsApplied * item.estimatedPricePerGuest;
        return `${index + 1}. *${item.name}* (Mín. ${item.minGuests} convidados)
   • Quantidade Atendida: ${guestsApplied} pessoas
   • Estimativa: ~ R$ ${itemTotal.toLocaleString("pt-BR")},00`;
      })
      .join("\n\n");

    const fullAddress = [
      street ? `Rua: ${street}` : "",
      number ? `Nº: ${number}` : "",
      complement ? `Compl/Local: ${complement}` : "",
      neighborhood ? `Bairro: ${neighborhood}` : "",
      cityUf ? `Cidade/UF: ${cityUf}` : "",
      cep ? `CEP: ${cep}` : "",
    ]
      .filter(Boolean)
      .join(", ");

    const messageText = `Olá! Montei meu carrinho de compras no site da Agatha Eventos:

👤 *DADOS DO CLIENTE:*
• *Nome Completo:* ${name || "Não informado"}
• *WhatsApp:* ${whatsapp || "Não informado"}
${email ? `• *E-mail:* ${email}` : ""}

🎈 *DADOS DO EVENTO:*
• *Tipo de Evento:* ${eventType}
• *Data:* ${eventDate || "A definir"}
• *Horário de Início:* ${eventTime || "A definir"} (${durationHours})
• *Total de Convidados:* ${guestCount} pessoas

📍 *ENDEREÇO DO EVENTO:*
• ${fullAddress || "A informar"}

🛒 *CARRINHOS SELECIONADOS NO PACOTE:*
${itemsFormatted}

💰 *VALOR APROXIMADO TOTAL:* ~ R$ ${totalEstimatedPrice.toLocaleString("pt-BR")},00
${notes ? `\n📝 *OBSERVAÇÕES:* ${notes}` : ""}

Aguardando atendimento para confirmar a disponibilidade da data e proposta oficial!`;

    const encodedMsg = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={closeCart} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          {/* Header */}
          <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-white flex items-center justify-center shadow-md">
                <PopcornCartIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-extrabold text-base sm:text-lg">Carrinho Gourmet Agatha</h2>
                <span className="text-xs text-rose-300">
                  {cartItems.length} carrinho(s) selecionado(s)
                </span>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Adaptable Guest Slider */}
            <div className="p-4 sm:p-5 rounded-2xl bg-pink-soft-gradient border border-rose-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <Users className="w-4 h-4 text-rose-500" />
                  <span>Convidados da Festa:</span>
                </label>
                <span className="text-sm sm:text-base font-black text-rose-600 bg-white px-3 py-1 rounded-xl shadow-xs border border-rose-200">
                  {guestCount} pessoas
                </span>
              </div>

              <input
                type="range"
                min="20"
                max="300"
                step="10"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <p className="text-[11px] text-slate-500 italic">
                * Todos os valores e sub-totais recalculam automaticamente.
              </p>
            </div>

            {/* Cart Items List */}
            {cartItems.length === 0 ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">Seu carrinho está vazio</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Adicione carrinhos gourmet do catálogo para montar o seu pacote de festa.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Itens Selecionados</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-500 hover:text-rose-700 transition-colors cursor-pointer text-[11px]"
                  >
                    Esvaziar Carrinho
                  </button>
                </div>

                {cartItems.map((item) => {
                  const guestsApplied = Math.max(guestCount, item.minGuests);
                  const itemEstimatedTotal = guestsApplied * item.estimatedPricePerGuest;

                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-3.5 relative group"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                            title="Remover produto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <span className="inline-block text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                          Mínimo: {item.minGuests} convidados
                        </span>

                        <div className="text-xs font-extrabold text-slate-800 pt-0.5">
                          ~ R$ {itemEstimatedTotal.toLocaleString("pt-BR")},00
                          <span className="text-[10px] text-slate-400 font-normal block">
                            (R$ {item.estimatedPricePerGuest}/pessoa x {guestsApplied} p.)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Approximate Total */}
            {cartItems.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 shadow-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs text-slate-400">Estimativa Aproximada Total:</span>
                  <span className="text-xl font-black text-amber-400">
                    ~ R$ {totalEstimatedPrice.toLocaleString("pt-BR")},00
                  </span>
                </div>
                <div className="flex items-start gap-2 text-[11px] text-slate-300 pt-1">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    Cálculo estimado. O orçamento final será confirmado no WhatsApp conforme o endereço e especificações.
                  </span>
                </div>
              </div>
            )}

            {/* Detailed Event Form */}
            {cartItems.length > 0 && (
              <form onSubmit={handleCheckoutWhatsApp} className="space-y-4 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
                  <User className="w-4 h-4" />
                  <span>1. Dados de Contato</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Nome Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Ana Maria"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: (11) 99999-9999"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">E-mail (Opcional)</label>
                  <input
                    type="email"
                    placeholder="exemplo@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider pt-2">
                  <Calendar className="w-4 h-4" />
                  <span>2. Detalhes da Celebração</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Tipo de Evento</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                    >
                      <option value="Aniversário">Aniversário</option>
                      <option value="Festa Infantil">Festa Infantil</option>
                      <option value="Corporativo">Corporativo</option>
                      <option value="Casamento">Casamento</option>
                      <option value="Formatura">Formatura</option>
                      <option value="Confraternização">Confraternização</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Data do Evento</label>
                    <input
                      type="text"
                      placeholder="Ex: 25/10/2026"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Horário de Início</label>
                    <input
                      type="text"
                      placeholder="Ex: 15:00h"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Duração Desejada</label>
                    <select
                      value={durationHours}
                      onChange={(e) => setDurationHours(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                    >
                      <option value="3 horas">3 horas</option>
                      <option value="4 horas">4 horas</option>
                      <option value="5 horas">5 horas</option>
                      <option value="Mais de 5 horas">Mais de 5 horas</option>
                    </select>
                  </div>
                </div>

                {/* CEP Address Section */}
                <div className="flex items-center justify-between text-rose-600 font-bold text-xs uppercase tracking-wider pt-2">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>3. Endereço do Evento (via CEP)</span>
                  </span>
                </div>

                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">CEP do Local do Evento *</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ex: 03314-000"
                        value={cep}
                        onChange={handleCepChange}
                        className="w-full pl-3.5 pr-10 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                      {loadingCep && (
                        <Loader2 className="w-4 h-4 text-rose-500 animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
                      )}
                    </div>
                    {cepError && (
                      <span className="text-[10px] text-rose-600 font-semibold">
                        CEP não encontrado. Preencha os campos abaixo manualmente.
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-slate-600">Logradouro / Rua</label>
                      <input
                        type="text"
                        placeholder="Rua / Avenida"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-600">Número</label>
                      <input
                        type="text"
                        placeholder="Nº 123"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-600">Bairro</label>
                      <input
                        type="text"
                        placeholder="Bairro"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-600">Cidade - UF</label>
                      <input
                        type="text"
                        placeholder="São Paulo - SP"
                        value={cityUf}
                        onChange={(e) => setCityUf(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600">Complemento / Nome do Buffet</label>
                    <input
                      type="text"
                      placeholder="Ex: Salão de Festas Bloco B ou Buffet Infantil"
                      value={complement}
                      onChange={(e) => setComplement(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Observações Adicionais</label>
                  <textarea
                    rows={2}
                    placeholder="Horário de montagem, restrições ou pedidos especiais..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                  />
                </div>

                <div className="pt-2 pb-6">
                  <Button
                    type="submit"
                    variant="whatsapp"
                    size="lg"
                    className="w-full shadow-emerald-500/30"
                    icon={<MessageCircle className="w-5 h-5" />}
                  >
                    Finalizar Orçamento pelo WhatsApp
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
