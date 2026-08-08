"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { checkAdminSession, getCompanySettings, saveCompanySettings, CompanySettings } from "@/lib/store";
import { fetchCepAddress, formatCep } from "@/lib/cep";
import { ArrowLeft, Save, Check, KeyRound, MessageCircle, MapPin, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminConfiguracoesPage() {
  const [settings, setSettings] = useState<CompanySettings>({
    whatsappNumber: "5511978447785",
    instagramHandle: "@agathaeventos2024",
    instagramUrl: "https://www.instagram.com/agathaeventos2024/",
    baseLocation: "Jardim Anália Franco — São Paulo/SP",
    adminPin: "123456",
  });

  // CEP for HQ Base Location State
  const [hqCep, setHqCep] = useState("");
  const [hqStreet, setHqStreet] = useState("");
  const [hqNeighborhood, setHqNeighborhood] = useState("Jardim Anália Franco");
  const [hqCityUf, setHqCityUf] = useState("São Paulo/SP");
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState(false);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!checkAdminSession()) {
      router.push("/admin");
      return;
    }
    setSettings(getCompanySettings());
  }, [router]);

  const handleHqCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setHqCep(formatted);
    setCepError(false);

    const cleanDigits = formatted.replace(/\D/g, "");
    if (cleanDigits.length === 8) {
      setLoadingCep(true);
      const data = await fetchCepAddress(cleanDigits);
      setLoadingCep(false);
      if (data) {
        setHqStreet(data.logradouro);
        setHqNeighborhood(data.bairro);
        const cityState = `${data.localidade}/${data.uf}`;
        setHqCityUf(cityState);

        const newBase = data.logradouro
          ? `${data.bairro} (${data.logradouro}) — ${cityState}`
          : `${data.bairro} — ${cityState}`;

        setSettings((prev) => ({ ...prev, baseLocation: newBase }));
      } else {
        setCepError(true);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveCompanySettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="pt-28 pb-16 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                Configurações da Empresa
              </span>
              <h1 className="text-3xl font-black text-slate-900">Canais, Localização & Segurança</h1>
            </div>
          </div>
        </div>

        {savedSuccess && (
          <div className="my-6 p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600" />
            <span>Configurações salvas com sucesso! As alterações já estão aplicadas em todo o site.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="my-8 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          {/* Section 1: Contact */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>1. Contato & Redes Sociais</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Número do WhatsApp (com DDD e 55)</label>
                <input
                  type="text"
                  required
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Handle do Instagram</label>
                <input
                  type="text"
                  required
                  value={settings.instagramHandle}
                  onChange={(e) => setSettings({ ...settings, instagramHandle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Link Completo do Instagram</label>
              <input
                type="url"
                required
                value={settings.instagramUrl}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Section 2: Base Location via CEP */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>2. Localização da Sede / Base (via CEP)</span>
            </h2>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">CEP da Sede da Agatha Eventos</label>
                <div className="relative max-w-xs">
                  <input
                    type="text"
                    placeholder="Ex: 03314-000"
                    value={hqCep}
                    onChange={handleHqCepChange}
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  {loadingCep && (
                    <Loader2 className="w-4 h-4 text-rose-500 animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
                  )}
                </div>
                {cepError && (
                  <span className="text-[10px] text-rose-600 font-semibold block pt-1">
                    CEP não localizado. Preencha ou edite os dados manualmente abaixo.
                  </span>
                )}
              </div>

              {hqStreet && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-800 block">Rua:</span> {hqStreet}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">Bairro:</span> {hqNeighborhood}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">Cidade/UF:</span> {hqCityUf}
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Base de Operações Exibida no Site</label>
                <input
                  type="text"
                  required
                  value={settings.baseLocation}
                  onChange={(e) => setSettings({ ...settings, baseLocation: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <p className="text-[11px] text-slate-500 italic pt-1">
                  * Este texto é exibido no Footer, área de atendimento e nas propostas do site.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Security */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-amber-500" />
              <span>3. Segurança do Painel</span>
            </h2>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">PIN / Senha de Acesso ao Painel Admin</label>
              <input
                type="text"
                required
                value={settings.adminPin}
                onChange={(e) => setSettings({ ...settings, adminPin: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="pt-4 text-right">
            <Button type="submit" variant="primary" size="lg" icon={<Save className="w-5 h-5" />}>
              Salvar Todas as Configurações
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
