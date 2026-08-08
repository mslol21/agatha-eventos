"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { checkAdminSession, getStoredLeads, updateLeadStatus, QuoteLead } from "@/lib/store";
import { ArrowLeft, Search, Filter, MessageCircle, Calendar, MapPin, Users, CheckCircle2 } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function AdminOrcamentosPage() {
  const [leads, setLeads] = useState<QuoteLead[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const router = useRouter();

  useEffect(() => {
    if (!checkAdminSession()) {
      router.push("/admin");
      return;
    }
    setLeads(getStoredLeads());
  }, [router]);

  const handleStatusChange = (leadId: string, newStatus: QuoteLead["status"]) => {
    updateLeadStatus(leadId, newStatus);
    setLeads(getStoredLeads());
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.whatsapp.includes(search) ||
      l.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "todos" || l.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="pt-28 pb-16 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                Gestão de Propostas
              </span>
              <h1 className="text-3xl font-black text-slate-900">Histórico de Orçamentos Recebidos</h1>
            </div>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-8 p-4 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por cliente, WhatsApp ou cidade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {[
              { id: "todos", label: "Todos" },
              { id: "novo", label: "Novos" },
              { id: "em_contato", label: "Em Contato" },
              { id: "enviado", label: "Proposta Enviada" },
              { id: "fechado", label: "Fechados" },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setFilterStatus(st.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === st.id
                    ? "bg-rose-500 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Cards Grid */}
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-rose-200 transition-all"
            >
              <div className="space-y-3 flex-grow">
                <div className="flex items-center gap-3">
                  <h3 className="font-extrabold text-lg text-slate-900">{lead.name}</h3>
                  <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                    {lead.eventType}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-semibold">
                    <MessageCircle className="w-4 h-4 text-emerald-500" />
                    {lead.whatsapp}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-rose-400" />
                    Data: {lead.eventDate || "A definir"}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-sky-400" />
                    {lead.city || "São Paulo"}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <Users className="w-4 h-4 text-amber-500" />
                    {lead.guestCount}
                  </span>
                </div>

                <div className="text-xs text-slate-700">
                  <strong>Serviços solicitados:</strong> {lead.services.join(", ")}
                </div>

                {lead.message && (
                  <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{lead.message}"
                  </p>
                )}
              </div>

              {/* Status Selector & WhatsApp Contact Button */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-3 shrink-0 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">Status da Proposta:</label>
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      handleStatusChange(lead.id, e.target.value as QuoteLead["status"])
                    }
                    className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                  >
                    <option value="novo">Novo (Aguardando)</option>
                    <option value="em_contato">Em Contato</option>
                    <option value="enviado">Proposta Enviada</option>
                    <option value="fechado">Evento Fechado 🎉</option>
                  </select>
                </div>

                <a
                  href={buildWhatsAppUrl({
                    name: lead.name,
                    whatsapp: lead.whatsapp,
                    eventType: lead.eventType,
                    eventDate: lead.eventDate,
                    city: lead.city,
                    guestCount: lead.guestCount,
                    services: lead.services,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
