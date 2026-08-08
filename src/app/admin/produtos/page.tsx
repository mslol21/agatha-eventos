"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { checkAdminSession, getStoredProducts, saveStoredProducts, CatalogProduct } from "@/lib/store";
import { ArrowLeft, Save, Check, Plus, Power, DollarSign, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminProdutosPage() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!checkAdminSession()) {
      router.push("/admin");
      return;
    }
    setProducts(getStoredProducts());
  }, [router]);

  const handleToggleActive = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, active: !p.active } : p
    );
    setProducts(updated);
  };

  const handlePriceChange = (id: string, price: number) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, estimatedPricePerGuest: price } : p
    );
    setProducts(updated);
  };

  const handleSaveAll = () => {
    saveStoredProducts(products);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

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
                Gestão do Catálogo
              </span>
              <h1 className="text-3xl font-black text-slate-900">Gerenciar Produtos & Carrinhos</h1>
            </div>
          </div>

          <Button
            onClick={handleSaveAll}
            variant="primary"
            size="md"
            icon={<Save className="w-4 h-4" />}
          >
            {savedSuccess ? "Alterações Salvas!" : "Salvar Alterações"}
          </Button>
        </div>

        {savedSuccess && (
          <div className="my-6 p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600" />
            <span>As alterações do catálogo foram salvas com sucesso e já estão visíveis no site!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {products.map((p) => (
            <div
              key={p.id}
              className={`p-6 rounded-3xl bg-white border transition-all space-y-4 ${
                p.active
                  ? "border-slate-200 shadow-sm"
                  : "border-rose-200 bg-rose-50/20 opacity-75"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    p.active ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {p.active ? "Ativo no Site" : "Inativo"}
                </span>

                <button
                  onClick={() => handleToggleActive(p.id)}
                  className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    p.active
                      ? "bg-slate-100 hover:bg-rose-100 text-rose-600 border-slate-200"
                      : "bg-emerald-100 text-emerald-800 border-emerald-200"
                  }`}
                >
                  <Power className="w-4 h-4" />
                  <span>{p.active ? "Desativar" : "Ativar"}</span>
                </button>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-900">{p.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{p.shortDescription}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700">
                  Preço Estimado por Convidado (R$):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">R$</span>
                  <input
                    type="number"
                    min="1"
                    value={p.estimatedPricePerGuest || 10}
                    onChange={(e) => handlePriceChange(p.id, Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
