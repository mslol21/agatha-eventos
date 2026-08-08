"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { checkAdminSession, setAdminSession, getStoredLeads, getStoredProducts, QuoteLead, CatalogProduct } from "@/lib/store";
import { Users, ShoppingBag, TrendingUp, CheckCircle, Clock, Sparkles, LogOut, ArrowRight, Layers, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<QuoteLead[]>([]);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!checkAdminSession()) {
      router.push("/admin");
      return;
    }
    setLeads(getStoredLeads());
    setProducts(getStoredProducts());
  }, [router]);

  const handleLogout = () => {
    setAdminSession(false);
    router.push("/admin");
  };

  const newLeadsCount = leads.filter((l) => l.status === "novo").length;
  const closedLeadsCount = leads.filter((l) => l.status === "fechado").length;
  const activeProductsCount = products.filter((p) => p.active).length;

  return (
    <div className="pt-28 pb-16 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              Painel de Controle Agatha Eventos
            </span>
            <h1 className="text-3xl font-black text-slate-900">Dashboard Administrativo</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/orcamentos"
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-rose-500" />
              <span>Orçamentos ({leads.length})</span>
            </Link>

            <Link
              href="/admin/produtos"
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4 text-sky-500" />
              <span>Produtos ({products.length})</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-600 hover:bg-rose-100 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Propostas Recebidas</span>
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">{leads.length}</div>
            <span className="text-[11px] text-slate-400">Total acumulado no site</span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Orçamentos Novos</span>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-amber-600">{newLeadsCount}</div>
            <span className="text-[11px] text-amber-600 font-medium">Aguardando atendimento</span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Eventos Fechados</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-600">{closedLeadsCount}</div>
            <span className="text-[11px] text-emerald-600 font-medium">Contratos confirmados</span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Carrinhos Ativos</span>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-indigo-600">{activeProductsCount}</div>
            <span className="text-[11px] text-slate-400">Disponíveis no catálogo</span>
          </div>
        </div>

        {/* Recent Quotes Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Últimos Orçamentos Recebidos</h2>
              <p className="text-xs text-slate-500">Histórico recente de contatos enviados pelo formulário e simulador</p>
            </div>

            <Link
              href="/admin/orcamentos"
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <span>Ver Todos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-3 px-4">Cliente / Nome</th>
                  <th className="py-3 px-4">Evento</th>
                  <th className="py-3 px-4">Cidade / Local</th>
                  <th className="py-3 px-4">Convidados</th>
                  <th className="py-3 px-4">Serviços</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900">
                      {lead.name}
                      <span className="block text-[10px] text-slate-400 font-normal">{lead.whatsapp}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-700">{lead.eventType}</td>
                    <td className="py-4 px-4 text-slate-600">{lead.city || "São Paulo"}</td>
                    <td className="py-4 px-4 font-semibold text-slate-800">{lead.guestCount}</td>
                    <td className="py-4 px-4 text-slate-600">{lead.services.join(", ")}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          lead.status === "novo"
                            ? "bg-amber-100 text-amber-800"
                            : lead.status === "fechado"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-sky-100 text-sky-800"
                        }`}
                      >
                        {lead.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
